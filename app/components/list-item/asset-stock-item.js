import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: [ 'item' ],

  didReceiveAttrs () {
    this.set('details', this.get('showAttributes'));
  },

  attributes: computed('asset.customFields', function () {
    let fields = this.get('asset.customFields'),
        attributes = Ember.A();

    for ( let key in fields ) {
      if ( !fields.hasOwnProperty(key) ) {
        continue;
      }

      attributes.pushObject({
        key,
        value: fields[key]
      });
    }

    return attributes;
  }),

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    }
  }
});
