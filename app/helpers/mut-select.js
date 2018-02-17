import { helper } from '@ember/component/helper';
import { set } from '@ember/object';

export function mutSelect([obj, path]) {
  return (component, id, value) => {
    set(obj, path, value);
  };
}

export default helper(mutSelect);
