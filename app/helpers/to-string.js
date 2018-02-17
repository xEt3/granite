import { helper } from '@ember/component/helper';

export function toString( [value] ) {
  return JSON.stringify(value);
}

export default helper(toString);
