import { helper } from '@ember/component/helper';
import { singularize, pluralize } from 'ember-inflector';

export function inflectText ([ text, length ]) {
  return length && length === 1 ? singularize(text) : pluralize(text);
}

export default helper(inflectText);
/*
  Usage
  ---
  You have {{employees.length}} {{inflect-text 'Employee' employees.length}}!
    -> Given employees.length is 0 or >1
    "You have 0 Employees!"
    -> Given employees.length is 1
    "You have 1 Employee!"

  Note: Preserves case
 */
