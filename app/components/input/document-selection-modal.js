import Ember from 'ember';
import pagination from 'granite/mixins/controller-abstractions/pagination';

const { Component, inject, computed, observer, run } = Ember;

export default Component.extend(pagination, {
  ajax: inject.service(),
  store: inject.service(),
  classNames: [ 'document__selector' ],
  limit: 2,
  page: 0,
  debounceSearches: 800,

  didReceiveAttrs() {
    this._super(...arguments);
    this.get('ajax').request('/api/v1/files', {
      data: {
        _distinct: true, select: 'tags'
      }
    }).then(tags => this.set('tags', tags));
  },

  searchTermChanged: observer('searchText', function () {
    if ( this.get('_searchDebounce') ) {
      run.cancel(this.get('_searchDebounce'));
    }

    this.set('_searchDebounce', run.later(() => {
      this.set('_searchText', this.get('searchText'));
      this.set('_searchDebounce', null);
    }, this.get('debounceSearches')));
  }),

  model: computed('selectedTag', '_searchText', 'page', 'limit', function () {
    let page = this.get('page') - 1 || 0,
        limit = this.get('limit'),
        search = this.get('_searchText'),
        tag = this.get('selectedTag'),
        query = { limit, page };

    if ( tag ) {
      console.log('tag', tag);
      query.tags = { $in: [ tag ] };
    }

    if ( search ) {
      let description,
          title = description = { $regex: search, $options: 'i' };
      query.$or = [ { title }, { description } ];
    }
    console.log(query);
    return this.get('store').query('file', query)
    .then(results => {
      console.log(results.get('meta'));
      console.log(results.toArray());
      return results.toArray();
    });
  }),

  actions: {
    selectDocuments () {
      Ember.$('#modal__document-selection')
      .modal({
        detachable: true
      })
      .modal('show');
    }
  }
});
// find out if the thing is a tag, searchTerm, or nothing
