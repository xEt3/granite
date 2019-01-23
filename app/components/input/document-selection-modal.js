/* eslint-disable ember/no-side-effects */
import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import $ from 'jquery';
import ajaxStatus from 'granite/mixins/ajax-status';
import pagination from 'granite/mixins/controller-abstractions/pagination';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Component.extend(pagination, addEdit, ajaxStatus, {
  ajax:              service(),
  store:             service(),
  classNames:        [ 'document__selector' ],
  limit:             10,
  page:              1,
  debounceSearches:  800,
  searchText:        '',
  selectedDocuments: A(),
  show:              false,
  enableNotify:      false,

  sansHashModalId: computed('elementId', function () {
    return `modal__document-selection-${this.elementId}`;
  }),

  modalId: computed('sansHashModalId', function () {
    return `#${this.get('sansHashModalId')}`;
  }),

  sansHashDropzoneId: computed('elementId', function () {
    return `input__dropzone--document-${this.elementId}`;
  }),

  dropzoneId: computed('sansHashDropzoneId', function () {
    return `#${this.get('sansHashDropzoneId')}`;
  }),

  didReceiveAttrs () {
    this._super(...arguments);
    let selected = this.get('selected'),
        selection = A();

    if (selected && !this.get('singleDoc')) {
      selection.addObjects(selected);
    }

    this.set('selectedDocuments', selection);

    this.get('ajax').request('/api/v1/files', {
      data: {
        _distinct: true,
        select:    'tags'
      }
    }).then(tags => {
      if (!this.get('isDestroyed') && !this.get('isDestroying')) {
        this.set('tags', tags);
      }
    });
  },

  searchTermChanged: observer('searchText', function () {
    if (this.get('_searchDebounce')) {
      run.cancel(this.get('_searchDebounce'));
    }

    this.set('_searchDebounce', run.later(() => {
      this.set('_searchText', this.get('searchText'));
      this.set('_searchDebounce', null);
    }, this.get('debounceSearches')));
  }),

  model: computed('selectedTag', '_searchText', 'page', 'limit', 'fileIsAdded', function () {
    let page = this.get('page') - 1 || 0,
        limit = this.get('limit'),
        search = this.get('_searchText'),
        tag = this.get('selectedTag'),
        query = {
          limit,
          page,
          systemUse: false
        },
        previousSearch = this.get('previousSearch'),
        previousTag = this.get('previousTag');

    this.setProperties({
      previousTag:    tag,
      previousSearch: search
    });

    if (tag !== previousTag || search !== previousSearch) {
      this.set('page', 1);
      page = 0;
    }

    if (tag) {
      query.tags = { $in: [ tag ] };
    }

    if (search) {
      let description,
          title = description = {
            $regex:   search,
            $options: 'i'
          };
      query.$or = [{ title }, { description }];
    }

    return new Promise(resolve => {
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
    run('afterRender', () => {
      $(this.get('modalId')).modal('refresh');
    });
  },

  didRender () {
    this._super(...arguments);
    this.refreshModal();
  },

  actions: {
    addDocument (file) {
      if (this.get('singleDoc')) {
        this.set('selectedDocument', file);
        return;
      }
      this.get('selectedDocuments').addObject(file);
      this.refreshModal();
    },

    removeDocument (file) {
      if (this.get('singleDoc')) {
        this.set('selectedDocument', null);
        return;
      }
      this.get('selectedDocuments').removeObject(file);
      this.refreshModal();
    },

    assign () {
      $(this.get('modalId')).modal('hide');
      if (this.get('singleDoc')) {
        this.get('onSelected')(this.get('selectedDocument'));
        return;
      }
      this.get('onSelected')(this.get('selectedDocuments'));
    },

    selectDocuments () {
      $(this.get('modalId'))
      .modal({ detachable: true })
      .modal('show');
    },

    notify (type, msg) {
      this.get('onNotify')(type, msg);
    },

    addedFile (file) {
      if (this.get('fileIsAdded')) {
        this.send('removeFile', this.get('fileIsAdded'));
      }

      this.set('fileIsAdded', file);
    },

    processQueue () {
      Dropzone.forElement(this.get('dropzoneId')).processQueue();
    },

    uploadedFile (file, res) {
      res.files = [ res.file ];
      delete res.file;
      this.get('store').pushPayload(res);
      this.get('resolveUpload')(this.get('store').peekRecord('file', res.files[0].id));
      this.send('removeFile', file);
    },

    removeFile (file) {
      Dropzone.forElement(this.get('dropzoneId')).removeFile(file);
      this.set('fileIsAdded', false);
    },

    async uploadFile () {
      this.ajaxStart();

      let autoTag = this.get('autoTag'),
          promise = new Promise(resolve => this.set('resolveUpload', resolve));

      this.send('processQueue');

      let file = await promise,
          properties = [ 'title', 'description', 'tags' ];

      properties.forEach(prop => {
        if (prop === 'title') {
          file.set(prop, this.get('fileName'));
        } else {
          file.set(prop, this.get(prop));
        }
      });

      if (autoTag) {
        file.set('tags', Array.isArray(autoTag) ? autoTag : [ autoTag ]);
      } else {
        file.set('tags', []);
      }

      try {
        await file.save();
      } catch (e) {
        this.ajaxError(e);
        return;
      }

      this.ajaxSuccess('Succesfully uploaded document.');
      this.send('addDocument', file);
      this.set('showDocumentUpload', false);
    }
  }
});
