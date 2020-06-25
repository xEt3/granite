import { helper } from '@ember/component/helper';
import moment from 'moment';

function time ([ date, format = 'M/D/YY' ]) {
  return date ? moment(date).format(format) : 'N/A';
}

export default helper(time);
