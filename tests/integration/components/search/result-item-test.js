import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | search/result-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it requires a result object to display child elements', async function (assert) {
    await render(hbs`{{search/result-item}}`);

    assert.dom('.search__result-item').exists();
    assert.dom('.search__result-item > *').doesNotExist('has no child elements');
  });

  test('employee type renders correct elements', async function (assert) {
    const { attrs } = await server.create('employee');
    let employee = this.owner.lookup('service:store').createRecord('employee', attrs);
    this.set('employee', employee);
    await render(hbs`{{search/result-item employee}}`);

    assert.dom('.search__result-item.search__result-item--employee').exists();
    assert.dom('.search__result-item > .search-result-item__title').hasText(employee.fullName);
    assert.dom('.search__result-item > .search-result-item__description').hasText(employee.jobTitle);
    let imageElm = find('.search__result-item > img.search-result-item__image');
    assert.equal(imageElm.getAttribute('src').indexOf('default') > -1, true, 'src has default image url');
  });

  test('department type renders correct elements', async function (assert) {
    const { attrs } = await server.create('department');
    let department = this.owner.lookup('service:store').createRecord('department', attrs);
    this.set('department', department);
    await render(hbs`{{search/result-item department}}`);

    assert.dom('.search__result-item.search__result-item--department').exists();
    assert.dom('.search__result-item > .search-result-item__title').hasText(department.name);
    assert.dom('.search__result-item > .search-result-item__description').doesNotExist();
    assert.dom('.search__result-item > img.search-result-item__image').doesNotExist();
  });

  test('location type renders correct elements', async function (assert) {
    const { attrs } = await server.create('location');
    let location = this.owner.lookup('service:store').createRecord('location', attrs);
    this.set('location', location);
    await render(hbs`{{search/result-item location}}`);

    assert.dom('.search__result-item.search__result-item--location').exists();
    assert.dom('.search__result-item > .search-result-item__title').hasText(location.name);
    assert.dom('.search__result-item > .search-result-item__description').hasText(location.addressLine1);
    assert.dom('.search__result-item > img.search-result-item__image').doesNotExist();
  });
});
