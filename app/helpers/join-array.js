import Ember from 'ember';

export function joinArray([array, separator = ', ']) {
  return array ? array.join(separator) : array;
}

export default Ember.Helper.helper(joinArray);
