import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { faker } from 'ember-cli-mirage';
import sinon from 'sinon';

module('Integration | Component | display/issue-documents', function (hooks) {
  setupRenderingTest(hooks);

  test('it works', async function (assert) {
    this.set('document', {
      title:       faker.system.fileName(),
      description: faker.lorem.sentence(),
      created:     new Date(),
      creator:     { 'fullName': faker.name.findName() }
    });

    const sinonstub = sinon.stub();

    this.set('onDeleteMeth', sinonstub);

    await render(hbs`<Display::IssueDocuments @document={{this.document}} @onDelete={{action onDeleteMeth}} />`);

    assert.dom(this.element, '.content .header').includesText(this.document.title);
    assert.dom(this.element, '.content .meta').includesText(this.document.description);
    assert.dom(this.element, '.content .meta.right.floated').includesText(this.document.creator.fullName);

    await click('.trash');
    await settled();
    await click('.modal .actions .green.button');

    assert.equal(sinonstub.callCount, 1);
  });
});
