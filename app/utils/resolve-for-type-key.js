import Ember from 'ember';

const { computed } = Ember;

const parsedName = s => {
  return s.replace(/([A-Z])/g, ($1, p1, pos) => {
    return (pos > 0 ? '-' : '') + $1.toLowerCase();
  });
};

export default function resolveForTypeKey ( key, iKey ) {
  let typeKey = iKey ? key : key + 'Type',
      idKey = iKey ? iKey : key + 'Id';

  return computed(typeKey, idKey, function () {
    const type = parsedName(this.get(typeKey)),
          id = this.get(idKey);

    return type && id ? this.store.find(type, id) : undefined;
  });
}
