import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  options: {
    theme: 'snow',
    modules: {
      toolbar: [
        [ { header: [2, 3, 4, false] } ],
        [ 'bold', 'italic', 'underline', 'strike' ],
        [ { 'list': 'ordered' }, { 'list': 'bullet' } ],
        [ { 'indent': '-1' }, { 'indent': '+1' } ],
        [ 'link' ],
        [ 'clean' ]
      ]
    }
  },

  actions: {
    updateText (editor) {
      this.get('onChange')(editor.root.innerHTML);
    }
  }
});
