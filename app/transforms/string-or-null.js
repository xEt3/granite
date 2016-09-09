import DS from 'ember-data';

const valOrUndefined = val => !val || val === '' ? undefined : val;

export default DS.Transform.extend({
  deserialize: valOrUndefined,
  serialize: valOrUndefined
});
