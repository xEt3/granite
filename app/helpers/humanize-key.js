import { helper } from '@ember/component/helper';
import humanizeKeyName from '../utils/humanize-key-name';

export function humanizeKey ([ str ]) {
  return humanizeKeyName(str);
}

export default helper(humanizeKey);
