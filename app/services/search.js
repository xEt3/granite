import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import { assert } from '@ember/debug';

const resultDisplayMap = {
  employee: {
    title:       [ 'name.first', 'name.middle', 'name.last' ],
    description: 'jobTitle'
  },
  department: { title: 'name' },
  location:   {
    title:       'name',
    description: [ 'address.line1', 'address.city', 'address.state' ]
  },
  companyuser: {
    title:       [ 'name.first', 'name.middle', 'name.last' ],
    description: 'email'
  }
};

const categoryMap = {
  employee:    'Employees',
  department:  'Departments',
  location:    'Locations',
  companyuser: 'Users'
};

const createSerializer = (serializerOptions) => {
  return (result) => {
    const { _type, _source } = result || {},
          typeMap = _type && resultDisplayMap[_type];

    if (!typeMap || !_source) {
      return result;
    }

    Object.keys(typeMap).forEach(key => {
      let combineKeys = typeMap[key];

      if (!Array.isArray(combineKeys)) {
        combineKeys = [ combineKeys ];
      }

      result[key] = combineKeys.map(subKey => get(_source, subKey))
      .filter(Boolean)
      .join(' ');
    });

    if (serializerOptions.categorical) {
      result.category = categoryMap[_type];
    }

    if (serializerOptions.image && serializerOptions.image[_type]) {
      let imgDef = serializerOptions.image[_type],
          imgKey = imgDef.key || imgDef;

      result[imgKey] = result._source[imgKey] || imgDef.default(result) || null;
    }

    return result;
  };
};

const searchDefaults = {
  categorical: true,

  image: {
    employee: {
      key: 'picture',
      default (m) {
        return m._id ? `/api/v1/employee/${m._id}/avatar` : 'https://www.gravatar.com/avatar/?f=y&d=mp';
      }
    }
  }
};

export default Service.extend({
  ajax: service(),

  fields: {
    title:       'title',
    description: 'description',
    image:       'picture'
  },

  performSearch (q, opts = {}) {
    assert(q, 'search#performSearch requires a query argument.');

    let searchOptions = Object.assign({}, searchDefaults, opts);

    return this.get('ajax').request('/api/v1/search', { data: { q } })
    .then(response => {
      let responseCopy = { ...response };
      responseCopy.results = this.serializeResults(response.results, searchOptions);
      return responseCopy;
    });
  },

  serializeResults (results = [], options = {}) {
    let mappedResults = results.map(createSerializer(options));

    if (options.categorical) {
      mappedResults = mappedResults.reduce((groups, result = {}) => {
        const { category } = result;

        if (!groups[category]) {
          groups[category] = {
            name:    category,
            results: []
          };
        }

        groups[category].results.push(result);
        return groups;
      }, {});
    }

    return mappedResults;
  }
});
