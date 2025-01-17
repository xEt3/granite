import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find, settled } from '@ember/test-helpers';
import faker from 'faker';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | search/result-item', function (hooks) {
  setupRenderingTest(hooks);

  test('it requires a result object to display child elements', async function (assert) {
    await render(hbs`<Search::ResultItem />`);

    assert.dom('.search__result-item').exists();
    assert.dom('.search__result-item > *').doesNotExist('has no child elements');
  });

  test('employee type renders correct elements', async function (assert) {
    const { attrs } = await server.create('employee');
    let employee = this.owner.lookup('service:store').createRecord('employee', attrs);
    employee.set('picture', null);
    employee.set('_id', employee.get('id')); // HACK: mimic result item
    this.set('employee', employee);
    await render(hbs`<Search::ResultItem @model={{this.employee}} @picture={{this.picture}} />`);

    assert.dom('.search__result-item').exists({ count: 1 });
    assert.dom('.search__result-item.search__result-item--employee').exists({ count: 1 });
    assert.dom('.search__result-item .search-result-item__title').hasText(employee.fullName);
    assert.dom('.search__result-item .search-result-item__description').hasText(employee.jobTitle);
    // Test default image src
    let imageElm = find('.search__result-item img.search-result-item__image');
    assert.equal(imageElm.getAttribute('src').indexOf(`/api/v1/employee/${employee.get('id')}/avatar`) > -1, true, 'src has default image url');
    // Test employee property image src
    employee.set('picture', faker.image.image());
    this.set('picture', employee.get('picture'));
    await settled();
    imageElm = find('.search__result-item img.search-result-item__image');
    assert.equal(imageElm.getAttribute('src').indexOf(this.get('employee.picture')) > -1, true, 'src has employee image url');
  });

  test('department type renders correct elements', async function (assert) {
    const { attrs } = await server.create('department');
    let department = this.owner.lookup('service:store').createRecord('department', attrs);
    this.set('department', department);
    await render(hbs`<Search::ResultItem @model={{this.department}} />`);
    assert.dom('.search__result-item').exists({ count: 1 });
    assert.dom('.search__result-item.search__result-item--department').exists({ count: 1 });
    assert.dom('.search__result-item.search__result-item--employee').doesNotExist();
    assert.dom('.search__result-item.search__result-item--location').doesNotExist();
    assert.dom('.search__result-item .search-result-item__title').hasText(department.name);
    assert.dom('.search__result-item .search-result-item__description').doesNotExist();
    assert.dom('.search__result-item img.search-result-item__image').doesNotExist();
  });

  test('location type renders correct elements', async function (assert) {
    const { attrs } = await server.create('location');
    let location = this.owner.lookup('service:store').createRecord('location', attrs);
    this.set('location', location);
    await render(hbs`<Search::ResultItem @model={{this.location}} />`);
    assert.dom('.search__result-item').exists({ count: 1 });
    assert.dom('.search__result-item.search__result-item--location').exists({ count: 1 });
    assert.dom('.search__result-item.search__result-item--employee').doesNotExist();
    assert.dom('.search__result-item.search__result-item--department').doesNotExist();
    assert.dom('.search__result-item .search-result-item__title').hasText(location.name);
    assert.dom('.search__result-item .search-result-item__description').hasText(location.addressLine1);
    assert.dom('.search__result-item img.search-result-item__image').doesNotExist();
  });
});
