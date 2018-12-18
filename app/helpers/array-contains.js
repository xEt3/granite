import { helper } from '@ember/component/helper';

export function arrayContains ([ array, value ]) {
  return array.includes(value);
}

export default helper(arrayContains);
