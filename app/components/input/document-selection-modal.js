import Ember from 'ember';
import pagination from 'granite/mixins/controller-abstractions/pagination';

const { A, Component, RSVP, inject, computed, observer, run } = Ember;

export default Component.extend(pagination, {
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
    let selection = A();

    if ( this.get('selected') ) {
      selection.addObjects(this.get('selected'));
    }

    this.set('selectedDocuments', selection);

    this.get('ajax').request('/api/v1/files', {
      data: {
        _distinct: true, select: 'tags'
      }
    }).then(tags => {
      if ( !this.get('isDestroyed') && !this.get('isDestroying') ) {
        this.set('tags', tags);
      }
    });
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
        this.refreshModal();
      });
    });
  }),

  refreshModal () {
    run.scheduleOnce('afterRender', () => {
      Ember.$('#modal__document-selection').modal('refresh');
    });
  },

  didRender () {
    this._super(...arguments);
    this.refreshModal();
  },

  actions: {
    addDocument (file) {
      this.get('selectedDocuments').addObject(file);
      this.refreshModal();
    },

    removeDocument (file) {
      this.get('selectedDocuments').removeObject(file);
      this.refreshModal();
    },

    assign () {
      Ember.$('#modal__document-selection').modal('hide');
      this.get('onSelected')(this.get('selectedDocuments'));
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
