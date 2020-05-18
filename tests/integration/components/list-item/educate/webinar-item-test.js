import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, click } from '@ember/test-helpers';
import { A } from '@ember/array';
import moment from 'moment';
import sinon from 'sinon';
import hbs from 'htmlbars-inline-precompile';
import { assertTooltipRendered, assertTooltipVisible, assertTooltipContent } from 'ember-tooltips/test-support';

module('Integration | Component | list-item/educate/webinar-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it shows an unpurchased webinar', async function (assert) {
    const webinar = server.create('webinar'),
          items = A(),
          atcStub = sinon.stub().callsFake((w) => {
            items.addObject(w);
          }),
          rfcStub = sinon.stub().callsFake((w) => {
            items.removeObject(w);
          });

    this.setProperties({
      webinar,
      items,
      'addToCart':      atcStub,
      'removeFromCart': rfcStub
    });

    // Render a "unpurchased webinar item", expect title, description, price, duration...
    await render(hbs`
      <ListItem::Educate::WebinarItem
        @webinar={{this.webinar}}
        @addToCart={{this.addToCart}}
        @removeFromCart={{this.removeFromCart}}
        @itemsInCart={{this.items}} />
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
    assert.equal(items.length, 1, 'item added to fake cart');
    await click('.webinar-card__purchase');
    assert.ok(rfcStub.calledOnce, '@removeFromCart was called');
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

    assert.dom('a.webinar-card__watch').exists();
    assert.dom('a.webinar-card__assign').exists();
  });
});
