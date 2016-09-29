import Ember from 'ember';
import titleCase from './title-case';

const ES = Ember.String;

let canned = {
  _id: 'Id',
  __v: 'Version'
};

export default function humanizeKeyName(key) {
  if ( !key ) {
    return key;
  }

  if ( canned[key] ) {
    return canned[key];
  }

  let transformedKey = key.split('.').map(p => ES.decamelize(p).replace(/([a-z])([0-9])/g, '$1 $2')).join(' ');
  return titleCase([transformedKey.replace('_', ' ')]);
}
