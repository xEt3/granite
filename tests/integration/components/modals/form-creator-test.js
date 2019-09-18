import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | modals/form-creator', function (hooks) {
  setupRenderingTest(hooks);

  test('it passes an action to open a modal, when called, opens a modal', async function (assert) {
    await render(hbs`
      {{#modals/form-creator
        formType="test" as |openModal|
      }}
        <a href="#" {{action openModal}} id="open-test">Open</a>
      {{/modals/form-creator}}
    `);

    assert.dom('.ember-application > .modals > .ui.modal').doesNotExist();
    await click('#open-test');
    assert.dom('.ember-application > .modals > .ui.modal').exists();
    assert.dom('.ui.modal > .header').hasText('Create Form');
    assert.dom('.ui.modal > .actions button:first-child').hasText('Close');
    assert.dom('.ui.modal > .actions button:last-child').includesText('Save Form');
    await click('.ui.modal > .actions button:first-child');
    assert.dom('.ember-application > .modals > .ui.modal:not(.hidden)').doesNotExist();
  });

  // test('without passing a form, form-creator creates a new form', async function (assert) {
  //   assert(0);
  // });
  //
  // test('passing a form, form-creator edits passed in form');
});
