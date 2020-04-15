import classic from 'ember-classic-decorator';
import UiSidebar from 'semantic-ui-ember/components/ui-sidebar';
import $ from 'jquery';

@classic
export default class _UiSidebar extends UiSidebar {
  'ui_context' = '.ember-application > div.ember-view';

  didInsertElement () {
    let context = this.ui_context;

    $(context).addClass('pushable');
    // this._super(...arguments);

    this.$().sidebar({ context: $(context) })
    .sidebar('attach events', `${context} > .menu .item`)
    .sidebar('setting', 'transition', this.transition);
  }
}
