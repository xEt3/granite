import Ember from 'ember';
import pagination from 'granite/mixins/controller-abstractions/pagination';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { A, Component, RSVP, inject, computed, observer, run } = Ember;

export default Component.extend(pagination, addEdit, {
  ajax: inject.service(),
  store: inject.service(),
  classNames: [ 'document__selector' ],
  limit: 10,
  page: 1,
  debounceSearches: 800,
  searchText: '',
  selectedDocuments: A(),

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
        query = { limit, page },
        previousSearch = this.get('previousSearch'),
        previousTag = this.get('previousTag');

    this.setProperties({
      previousTag: tag,
      previousSearch: search
    });

    if ( tag !== previousTag || search !== previousSearch ) {
      this.set('page', 1);
      page = 0;
    }

    if ( tag ) {
      query.tags = { $in: [ tag ] };
    }

    if ( search ) {
      let description,
          title = description = { $regex: search, $options: 'i' };
      query.$or = [ { title }, { description } ];
    }

    return new RSVP.Promise(resolve => {
      this.get('store').query('file', query)
      .then(results => {
        this.set('results', results);
        this.set('metadata', results.get('meta'));
        resolve(results);
      });
    });
  }),

  actions: {
    addDocument (file) {
      this.get('selectedDocuments').pushObject(file);
    },

    removeDocument (file) {
      this.get('selectedDocuments').removeObject(file);
    },

    saveDocuments () {
      this.set('model.offboardingDocuments', this.get('selectedDocuments'));
      this.send('save');
    },

    selectDocuments () {
      Ember.$('#modal__document-selection')
      .modal({
        detachable: true
      })
      .modal('show');
    }
  }
});
