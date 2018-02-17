import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-item/document-item', 'Integration | Component | list item/document item', {
  integration: true
});

test('it displays like it should', function(assert) {
  this.render(hbs`{{list-item/document-item doc assign=assign}}`);
  this.set('doc', {
    extension: 'pdf',
    title: 'Some document',
    tags: [ 'test', 'check' ]
  });
  this.set('assign', () => {});

  let text = this.$().text().trim().toLowerCase();

  assert.ok(text.indexOf('pdf') > -1, 'should show extension');
  assert.ok(text.indexOf('some document') > -1, 'should show title');
  assert.ok(text.indexOf('test') > -1, 'should first tag');
  assert.ok(text.indexOf('check') > -1, 'should second tag');
});
