import { helper } from '@ember/component/helper';

export function xInc([val = 0, inc = 1]) {
  return val + inc;
}

export default helper(xInc);
