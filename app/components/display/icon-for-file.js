import Ember from 'ember';
import fileTypes from 'granite/config/mime-types';

const { Component, A, computed } = Ember;

const IconForFileComponent = Component.extend({
  tagName: 'i',
  classNameBindings: [ 'icon' ],
  classNames: [ 'icon' ],

  icon: computed('file.{mimeType,extension}', function () {
    let m = A(fileTypes).find(f => f.match.test(this.get(`file.${f.strategy}`)));
    return m ? m.icon : 'file outline';
  })
});

IconForFileComponent.reopenClass({
  positionalParams: [ 'file' ]
});

export default IconForFileComponent;
