import Ember from 'ember';
import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function longText([text]/*, hash*/) {
  let body = Ember.Handlebars.Utils.escapeExpression(text);
  body = body.replace(/\n\r?/g, '<br>');
  return new htmlSafe(body);
}

export default helper(longText);
