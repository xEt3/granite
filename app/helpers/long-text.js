import Ember from 'ember';

export function longText([text]/*, hash*/) {
  let body = Ember.Handlebars.Utils.escapeExpression(text);
  body = body.replace(/\n\r?/g, '<br>');
  return new Ember.String.htmlSafe(body);
}

export default Ember.Helper.helper(longText);
