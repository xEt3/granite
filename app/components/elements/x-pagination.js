import Ember from 'ember';

const { Component, computed, assert } = Ember;

export default Component.extend({
  _pages: computed.reads('pages'),
  classNames: [ 'ui', 'right', 'floated', 'pagination', 'menu' ],
  maxButtons: 6,

  didReceiveAttrs () {
    this.set('_page', parseFloat(this.get('page')));
  },

  _buttons: computed('_pages', '_page', 'maxButtons', function () {
    let l = [],
        t = this.getProperties('_pages', '_page', 'maxButtons');

    if ( !t._pages ) {
      return [];
    }

    var p = t._page > t.maxButtons / 2 ? t._page - t.maxButtons / 2 : 1;

    if ( isNaN(t._pages) || isNaN(p) ) {
      return [];
    }

    if ( p + t.maxButtons > t._pages ) {
      p = t._pages - t.maxButtons + 1;
    }

    if ( p < 0 ) {
      p = 1;
    }

    var topLoop = t._pages >= t.maxButtons ? t.maxButtons : t._pages;

    for ( var loop = 0; loop < topLoop; loop++ ) {
      l.push({
        n: p,
        active: p === t._page
      });

      p++;
    }

    return l;
  }),

  onFirstPage: computed.lte('_page', 1),

  onLastPage: computed('_page', '_pages', function () {
    return this.get('_page') >= this.get('_pages');
  }),

  change () {
    this.get('onchange')(this.get('_page'));
  },

  actions: {
    setPage ( n ) {
      this.set('_page', n);
      this.change();
    },

    incrementPage ( inc = 1 ) {
      if ( this.get('_page') + inc >= this.get('_pages') ) {
        this.set('_page', this.get('_pages'));
      } else {
        this.incrementProperty('_page', inc);
      }

      this.change();
    },

    decrementPage ( dec = 1 ) {
      if ( dec >= this.get('_page') ) {
        this.set('_page', 1);
      } else {
        this.decrementProperty('_page', dec);
      }

      this.change();
    }
  }
});
