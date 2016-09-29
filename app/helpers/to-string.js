import Ember from 'ember';

export function toString( [value] ) {
  return JSON.stringify(value);
}

export default Ember.Helper.helper(toString);
