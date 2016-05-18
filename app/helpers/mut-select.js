import Ember from 'ember';

const { set } = Ember;

export function mutSelect([obj, path]) {
  return ( component, id, value ) => {
    set(obj, path, value);
  };
}

export default Ember.Helper.helper(mutSelect);
