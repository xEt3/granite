import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | benefits/plan', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    this.server.loadFixtures('plans');

    const store = this.owner.lookup('service:store'),
          plans = await store.findAll('plan');

    this.set('plans', plans);
    await render(hbs`<div class="ui three cards">{{#each this.plans as |plan|}}<Benefits::Plan @plan={{plan}} />{{/each}}</div>`);

    // for (let i = 0; i < plans.length; i++) {
    // let plan = plans[i];

    // this.set('plan', plan);
    // await render(hbs`<Benefits::Plan @plan={{this.plan}} />`);
    await this.pauseTest();
    // }

    assert.equal(this.element.textContent.trim(), '');
  });
});
