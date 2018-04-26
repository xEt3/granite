import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | display/filter-pane', function(hooks) {
  setupRenderingTest(hooks);

  test('it yields filtering components, update works', async function(assert) {
    let updateCalled;

    this.set('someAction', function () {
      updateCalled = Array.prototype.slice.call(arguments);
    });

    this.set('aVar', false);

    await render(hbs`
      {{#display/filter-pane onChange=(action someAction) class="pane" as |filter|}}
        {{#filter.section 'Some Section' class="section"}}
          {{#filter.control 'aValue' aVar class="control" as |update|}}
            <a href="#" {{action update false}}>update</a>
          {{/filter.control}}
        {{/filter.section}}
      {{/display/filter-pane}}
    `);

    // Check section rendering, control invisibility
    assert.ok(this.element.textContent.trim().indexOf('Some Section') > -1, 'Section name is rendered.');
    assert.ok(find('.section > div.hidden'), 'Control is not visible');
    await click('.section .clickable.header');

    // Trigger change, check control visibility
    assert.notOk(find('.section > div.hidden'), 'Control is visible');
    await click('a[href="#"]');
    assert.deepEqual(updateCalled, [ 'aValue', false ], 'function called');

    // Check reset operations
    await click('.section .clickable.header');
    assert.deepEqual(updateCalled, [ 'aValue', undefined ], 'function called');
  });
});
