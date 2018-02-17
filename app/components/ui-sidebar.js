import UiSidebar from 'semantic-ui-ember/components/ui-sidebar';
import $ from 'jquery';

export default UiSidebar.extend({
  'ui_context': 'body.ember-application > div.ember-view',

  didInsertElement() {
    let context = this.get('ui_context');

    $(context).addClass('pushable');
    // this._super(...arguments);

    this.$().sidebar({
      context: $(context)
    })
    .sidebar('attach events', `${context} > .menu .item`)
    .sidebar('setting', 'transition', this.get('transition'));
  }
});
