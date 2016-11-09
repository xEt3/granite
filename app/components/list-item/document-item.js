import Ember from 'ember';

const { Component, computed } = Ember;

const DocumentItemComponent = Component.extend({
  tagName: '',
  imagePreview: computed.match('file.extension', /je?pg|png|gif/i)
});

DocumentItemComponent.reopenClass({
  positionalParams: [ 'file' ]
});

export default DocumentItemComponent;
