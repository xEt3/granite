import titleCase from './title-case';

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

  return titleCase(key.replace('.', ' '));
}
