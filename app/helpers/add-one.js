import { helper } from '@ember/component/helper';

export function addOne([num]) {
  return parseFloat(num) + 1;
}

export default helper(addOne);
