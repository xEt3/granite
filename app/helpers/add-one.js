import Ember from 'ember';

export function addOne([num]) {
  return parseFloat(num) + 1;
}

export default Ember.Helper.helper(addOne);
