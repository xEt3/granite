import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, click } from '@ember/test-helpers';
import moment from 'moment';
import sinon from 'sinon';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipRendered, assertTooltipVisible, assertTooltipContent } from 'ember-tooltips/test-support';

module('Integration | Component | list-item/educate/webinar-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it shows an unpurchased webinar', async function (assert) {
    const webinar = server.create('webinar'),
          atcStub = sinon.stub().returns(true);

    this.set('webinar', webinar);
    this.set('addToCart', atcStub);

    // Render a "unpurchased webinar item", expect title, description, price, duration...
    await render(hbs`
      <ListItem::Educate::WebinarItem
        @webinar={{this.webinar}}
        @addToCart={{this.addToCart}} />
    `);

    assert.dom(this.element, '.webinar-card__title').includesText(webinar.title);
    assert.dom(this.element, '.webinar-card__description').includesText(webinar.description);
    assert.dom('.webinar-card__purchase').exists();
    await triggerEvent('.webinar-card__access i', 'mouseenter');
    assertTooltipRendered(assert);
    assertTooltipVisible(assert);

    await click('.webinar-card__purchase');
    assert.ok(atcStub.calledOnce, '@addToCart was called');
    assert.equal(atcStub.firstCall.args[0].id, webinar.id, '@addToCart was passed the correct webinar');
  });

  test('it shows a purchased webinar', async function (assert) {
    const webinar = server.create('webinar'),
          webinarAuthorization = server.create('webinarAuthorization', { webinar });

    this.setProperties({
      webinar,
      webinarAuthorization
    });

    // Render a purchased webinar item and expect title, description, remaining duration, assign button, watch button
    await render(hbs`
      <ListItem::Educate::WebinarItem
        @webinar={{this.webinar}}
        @authorization={{this.webinarAuthorization}} />
    `);
    assert.dom(this.element, '.webinar-card__title').includesText(webinar.title);
    assert.dom(this.element, '.webinar-card__description').includesText(webinar.description);
    assert.dom('.webinar-card__purchase').doesNotExist();
    await triggerEvent('.webinar-card__access i', 'mouseenter');
    assertTooltipRendered(assert);
    assertTooltipVisible(assert);
    assertTooltipContent(assert, { contentString: `${ moment(webinarAuthorization.expiration).diff(new Date(), 'days')} days of 90 remaining` });

    assert.dom('a.webinar-card__watch').exists();
    assert.dom('a.webinar-card__assign').exists();
  });
});
