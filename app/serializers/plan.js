import DS from 'ember-data';
import ApplicationSerializer from './application';
import normalizeKeys from '../utils/serialize-object';
import serializeKeys from '../utils/expand-serialized-object';

export default class Plan extends ApplicationSerializer.extend(DS.EmbeddedRecordsMixin) {
    attrs = {
      ratesAgeTiersEmployee:  { embedded: 'always' },
      ratesAgeTiersSpouse:    { embedded: 'always' },
      ratesAgeTiersDependent: { embedded: 'always' }
    }

    normalize (modelClass, hash) {

      if (hash.rates) {
        hash.ratesAgeTiersEmployee  = hash.rates.ageTiers.employee ? [ ...hash.rates.ageTiers.employee ] : [];
        hash.ratesAgeTiersDependent = hash.rates.ageTiers.dependent ? [ ...hash.rates.ageTiers.dependent ] : [];
        hash.ratesAgeTiersSpouse    = hash.rates.ageTiers.spouse ? [ ...hash.rates.ageTiers.spouse ] : [];
        delete hash.rates.ageTiers;
      }
      normalizeKeys(hash, true, 'contact', 'network', 'rates', 'contributions');

      return super.normalize(...arguments);
    }

    serialize () {
      let json = super.serialize(...arguments),
          deleteKeys = [
            'contactName',
            'contactPhone',
            'contactFax',
            'contactAddressLine1',
            'contactAddressCity',
            'contactAddressState',
            'contactAddressZip'
          ];

      json.contact = {
        name:    json.contactName,
        phone:   json.contactPhone,
        fax:     json.contactFax,
        address: {
          line1: json.contactAddressLine1,
          city:  json.contactAddressCity,
          state: json.contactAddressState,
          zip:   json.contactAddressZip
        }
      };

      let titles = [ 'Employee', 'Spouse', 'Children', 'Family' ];
      titles.forEach(title =>{
        if (json[`contributions${title}Amount`]) {
          deleteKeys.push(...[ `contributions${title}Amount`, `contributions${title}Type`, `contributions${title}wellnessModifier` ]);
        }
      });

      json.contributions = {
        employee: {
          amount:           json.contributionsEmployeeAmount,
          wellnessModifier: json.contributionsEmployeeWellnessModifier,
          type:             json.contributionsEmployeeType
        },
        spouse: {
          amount:           json.contributionsSpouseAmount,
          wellnessModifier: json.contributionsSpouseWellnessModifier,
          type:             json.contributionsSpouseType
        },
        children: {
          amount:           json.contributionsChildrenAmount,
          wellnessModifier: json.contributionsChildrenWellnessModifier,
          type:             json.contributionsChildrenType
        },
        family: {
          amount:           json.contributionsFamilyAmount,
          wellnessModifier: json.contributionsFamilyWellnessModifier,
          type:             json.contributionsFamilyType
        }
      };

      deleteKeys.map(k => delete json[k]);
      serializeKeys(json, 'network', 'rates');

      return json;
    }
}
