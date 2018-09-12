import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import fileTypes from 'granite/config/mime-types';

const IconForFileComponent = Component.extend({
  tagName:           'i',
  classNameBindings: [ 'icon' ],
  classNames:        [ 'icon' ],

  icon: computed('file.{mimeType,extension}', function () {
    let m = A(fileTypes).find(f => f.match.test(this.get(`file.${f.strategy}`)));
    return m ? m.icon : 'file';
  })
});

IconForFileComponent.reopenClass({ positionalParams: [ 'file' ] });

export default IconForFileComponent;
