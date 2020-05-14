import { module, test, skip } from 'qunit';
import { visit, currentURL, click, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import sinon from 'sinon';
import authenticate from 'granite/tests/helpers/auth';


module('Acceptance | education/webinars', function (hooks) {
  setupApplicationTest(hooks);

  test('has a menu presence in education', async function (assert) {
    await authenticate.call(this, server);
    await visit('/account/dashboard');
    assert.equal(currentURL(), '/account/dashboard');
    await click('.ui.menu.account__navigation > a');
    await click('.account__sidebar > a[href="/account/education"]');
    assert.equal(currentURL(), '/account/education');


    // expect navigation bar with webinars button
    // expect summary
    assert.dom('.menu.menu__education-page').exists();
    assert.dom('.application__outlet-wrapper > .container > .container > .segment .educate__employee-breakdown').exists();
    await click('.ui.pointing.menu a[href="/account/education/webinars"]');
    assert.equal(currentURL(), '/account/education/webinars');
    assert.dom('h2.ui.header').hasText('Webinars');
  });

  test('shows a list of webinars without data', async function (assert) {
    await authenticate.call(this, server);

    await visit('/account/education/webinars');
    // Expect a blank message
    assert.dom('.page__webinars').exists();
    assert.dom('.page__webinars .webinars-list').includesText('No webinars available');
  });

  test('shows a list of webinars with data', async function (assert) {
    await authenticate.call(this, server);

    // Generate a list of webinars
    const webinars = await server.createList('webinar', 10);

    // Visit page...
    await visit('/account/education/webinars');

    // Expect a list of webinars
    assert.equal(currentURL(), '/account/education/webinars');
    let $webinarCards = await findAll('.webinars-list .webinar__card');
    await this.pauseTest();
    assert.equal($webinarCards.length, 10);

    for (let i = 0; i < webinars.length; i++) {
      const wi = webinars[i];
      assert.dom($webinarCards[i], '.webinar-card__title').includesText(wi.title);
      assert.dom($webinarCards[i], '.webinar-card__description').includesText(wi.description);
    }
  });

  test('allows a purchase of one or more webinars', async function (assert) {
    await authenticate.call(this, server);
    const webinars = await server.createList('webinar', 10);

    await visit('/account/education/webinars');
    assert.equal(currentURL(), '/account/education/webinars');

    // Click the first webinar
    await click('a.webinar-card__purchase .add');
    await click('a.webinar-card__purchase .add');
    assert.dom('.webinars-cart').exists();
    assert.dom('.sticky-cart__purchase').exists();
    assert.dom('.webinars-cart .sticky-cart__item-count').includesText('2');
    assert.dom('.webinars-cart .sticky-cart-expanded-view__total').includesText(`$${webinars[0].price + webinars[1].price}`);
    // // Click checkout
    await click('.webinars-cart .sticky-cart__purchase');
    assert.dom('.confirm-modal').exists();
    // // Click confirm
    click('.confirm-modal .actions > .green.button');
    await new Promise(resolve => setTimeout(resolve, 500));

    assert.ok(currentURL().indexOf('/account/education/webinars/purchase?') > -1);
    assert.dom('.webinars-purchase').includesText('One moment while we process your transaction');
    await new Promise(resolve => setTimeout(resolve, 2000));
    assert.ok(currentURL().indexOf('/account/education/webinars/purchased') > -1);
    assert.dom('.webinars-purchased .header').includesText(`Receipt for your webinar purchase on ${moment().format('M/D/YY')}`);
    // Line items
    assert.dom('.webinars-purchased .webinars-purchase__receipt .receipt__line-item').includesText(webinars[0].title);
    assert.dom('.webinars-purchased .webinars-purchase__receipt .receipt__line-item').includesText(webinars[0].description);
    assert.dom('.webinars-purchased .webinars-purchase__receipt .receipt__line-item').includesText(webinars[0].price);
    assert.dom('.webinars-purchased .webinars-purchase__receipt .receipt__total').includesText(webinars[0].price + webinars[1].price);
    // Card information
    assert.dom('.webinars-purchased .webinars-purchase__receipt .receipt__card-info').exists();
    assert.dom('.webinars-purchased .webinars-purchase__receipt .receipt__card-info .card-info__number').includesText('411111******1111');
    assert.dom('.webinars-purchased .webinars-purchase__receipt .receipt__card-info img.card-info__image[src="https://assets.braintreegateway.com/payment_method_logo/visa.png?environment=sandbox"]').exists();

    const windowPrintStub = sinon.stub(window, 'print').returns(true);

    // Print button
    await click('a.webinars-purchased__print');
    assert.ok(windowPrintStub.calledOnce, 'window.print calledOnce');
    windowPrintStub.restore();

    // Link back to webinars
    assert.dom('.webinars-purchased a[href="/account/education/webinars"].button.green.fluid').exists();

    await this.pauseTest();
  });

  skip('shows webinars you have authorization to');
});
