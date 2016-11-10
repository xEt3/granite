import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('display/icon-for-file', 'Integration | Component | display/icon for file', {
  integration: true
});

let testFiles = {
  image: [ ['image/png', 'png'], ['image/jpg', 'jpg'] ],
  excel: [ ['application/vnd.excel', 'xls'], ['application/vnd.openspreadsheet', 'xlsx'] ],
  word: [ ['application/textmsword', 'doc'], ['application/something', 'docx'] ],
  archive: [ ['application/archive', 'tar'], ['application/rar', 'rar'], ['application/zip', 'zip'] ],
  code: [ ['application/javascript', 'js'] ],
  video: [ ['video/mp4', 'mp4'] ],
  text: [ ['text/plain', 'txt'] ],
  pdf: [ ['application/pdf', 'pdf'] ]
};

test('it renders', function(assert) {
  assert.expect(13);
  this.render(hbs`{{display/icon-for-file file}}`);

  for ( let iconClass in testFiles ) {
    if ( !testFiles.hasOwnProperty(iconClass) ) {
      continue;
    }

    testFiles[iconClass].forEach(t => {
      this.set('file', { mimeType: t[0], extension: t[1] });
      assert.ok(this.$().html().indexOf(iconClass) > -1, `${t[1]} should have ${iconClass} in icon class`);
    });
  }
});
