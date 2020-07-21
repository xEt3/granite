import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import formatMoney from 'accounting/format-money';

module('Integration | Component | benefits/plan', function (hooks) {
  setupRenderingTest(hooks);

  test('it displays all plan types properly', async function (assert) {
    this.server.loadFixtures('plans');

    const store = this.owner.lookup('service:store'),
          plans = (await store.findAll('plan')).toArray();

    // Label, icon
    const planTypes = {
      M: [ 'Health', 'stethoscope' ],
      L: [ 'Life', 'life' ],
      D: [ 'Dental', 'clipboard' ],
      V: [ 'Vision', 'eye' ]
    };

    for (let i = 0; i < plans.length; i++) {
      let plan = plans[i],
          [ planLabel, icon ] = planTypes[plan.type];

      this.set('plan', plan);
      await render(hbs`<Benefits::Plan @plan={{this.plan}} />`);

      assert.dom('.benefit__plan-card > .content > .right').includesText(planLabel);
      assert.dom('.benefit__plan-card > .content > .right > .icon').hasClass(icon);
      assert.dom('.benefit__plan-card > .content > .header').hasText(plan.name);
      assert.dom('.benefit__plan-card > .content > .plan-card__description').hasText(plan.description);

      if (plan.networkName) {
        await click('.benefit__plan-card > .extra.content.plan-card__network a')
        assert.dom('.benefit__plan-card > .extra.content.plan-card__network').includesText(plan.networkName);
        assert.dom('.benefit__plan-card > .extra.content.plan-card__network').includesText(plan.networkDescription);
      }

      if (plan.ratesFixed) {
        assert.dom('.benefit__plan-card > .extra.content.plan-card__rates').includesText('Fixed');
        assert.dom('.benefit__plan-card > .extra.content.plan-card__rates').includesText(formatMoney(plan.ratesFixed));
      } else {
        assert.dom('.benefit__plan-card > .extra.content.plan-card__rates').includesText('Employee');
        assert.dom('.benefit__plan-card > .extra.content.plan-card__rates').includesText(formatMoney(plan.ratesEmployee));

        assert.dom('.benefit__plan-card > .extra.content.plan-card__rates').includesText('Employee & Spouse');
        assert.dom('.benefit__plan-card > .extra.content.plan-card__rates').includesText(formatMoney(plan.ratesSpouse));

        assert.dom('.benefit__plan-card > .extra.content.plan-card__rates').includesText('Employee & Dependents');
        assert.dom('.benefit__plan-card > .extra.content.plan-card__rates').includesText(formatMoney(plan.ratesDependent));

        assert.dom('.benefit__plan-card > .extra.content.plan-card__rates').includesText('Family');
        assert.dom('.benefit__plan-card > .extra.content.plan-card__rates').includesText(formatMoney(plan.ratesFamily));
      }
    }
  });
});
