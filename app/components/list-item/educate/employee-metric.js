import BaseLiComponent from '../base';
import { computed } from '@ember/object';

export default BaseLiComponent.extend({
  classNames: [ 'ui', 'card' ],

  percentCompleted: computed('model.{completed,assigned}', function () {
    const completed = this.get('model.completed') || 0,
          assigned = this.get('model.total') || 0;

    return Math.round(completed / assigned * 100);
  })
});
