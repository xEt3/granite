import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | display/filter-pane', function(hooks) {
  setupRenderingTest(hooks);

  test('it yields filtering components, update works', async function(assert) {
    let updateCalled;

    this.set('someAction', function () {
      updateCalled = Array.prototype.slice.call(arguments);
    });

    await render(hbs`
      {{#display/filter-pane onChange=(action someAction) as |filter|}}
        {{#filter.section 'Some Section'}}
          {{#filter.control 'aValue' true as |update|}}
            <a href="#" {{action update false}}>update</a>
          {{/filter.control}}
        {{/filter.section}}
      {{/display/filter-pane}}
    `);

    assert.ok(this.element.textContent.trim().indexOf('Some Section') > -1, 'Section name is rendered.');

    await click('a[href="#"]');
    assert.deepEqual(updateCalled, [ 'aValue', false ], 'function called');
  });
});
