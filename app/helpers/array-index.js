import { helper } from '@ember/component/helper';

export function arrayIndex ([ array, index ]) {
  let t = array[index];


  return t.enums;
}

export default helper(arrayIndex);
