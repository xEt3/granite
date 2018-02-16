import { helper } from '@ember/component/helper';

export function joinArray([array, separator = ', ']) {
  return array ? array.join(separator) : array;
}

export default helper(joinArray);
