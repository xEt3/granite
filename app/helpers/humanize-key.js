import Ember from 'ember';
import humanizeKeyName from '../utils/humanize-key-name';

export function humanizeKey([str]) {
  return humanizeKeyName(str);
}

export default Ember.Helper.helper(humanizeKey);
