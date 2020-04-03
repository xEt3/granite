/* eslint-disable ember/no-side-effects */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import $ from 'jquery';
// import ajaxStatus from 'granite/mixins/ajax-status';
// import pagination from 'granite/mixins/controller-abstractions/pagination';
// import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default class InputDocumentSelectionModalComponent extends Component {
  @service ajax
  @service store
  @service data
  classNames =        [ 'document__selector' ]
  limit =             10
  page =              1
  debounceSearches =  800
  searchText =        ''
  selectedDocuments = A()
  show =              false
  enableNotify =      false

  get sansHashModalId () {
    return `modal__document-selection-${this.elementId}`;
  }

  get modalId () {
    return `#${this.sansHashModalId}`;
  }

  get sansHashDropzoneId () {
    return `input__dropzone--document-${this.elementId}`;
  }

  get dropzoneId () {
    return `#${this.sansHashDropzoneId}`;
  }

  async didReceiveAttrs () {
    super.model(...arguments);
    let selected = this.selected,
        selection = A();

    if (selected && !this.singleDoc) {
      selection.addObjects(selected);
    }

    this.selectedDocuments = selection;

    let tags = await this.ajax.request('/api/v1/files', {
      data: {
        _distinct: true,
        select:    'tags'
      }
    });

    if (!this.isDestroyed && !this.isDestroying) {
      this.tags = tags;
    }
  }

  /* eslint-disable-next-line */
  searchTermChanged () {
    if (this._searchDebounce) {
      run.cancel(this._searchDebounce);
    }

    this._searchDebounce = run.later(() => {
      this._searchText = this.searchText;
      this._searchDebounce = null;
    }, this.debounceSearches);
    // this.set('_searchDebounce', run.later(() => {
    //   this.set('_searchText', this.get('searchText'));
    //   this.set('_searchDebounce', null);
    // }, this.get('debounceSearches')));
  }
  // searchTermChanged: observer('searchText', function () {
  //   if (this.get('_searchDebounce')) {
  //     run.cancel(this.get('_searchDebounce'));
  //   }
  //
  //   this.set('_searchDebounce', run.later(() => {
  //     this.set('_searchText', this.get('searchText'));
  //     this.set('_searchDebounce', null);
  //   }, this.get('debounceSearches')));
  // }),

  get model () {
    let page = this.page - 1 || 0,
        limit = this.limit,
        search = this._searchText,
        tag = this.selectedTag,
        query = {
          limit,
          page,
          systemUse: this.systemUse
        },
        previousSearch = this.previousSearch,
        previousTag = this.previousTag;

    if (this.correctiveAction) {
      query.correctiveAction = this.correctiveAction.id;
    }

    this.previousTag = tag;
    this.previousSearch = search;

    if (tag !== previousTag || search !== previousSearch) {
      this.page = 1;
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
      this.store.query('file', query)
      .then(results => {
        this.results = results;
        this.metadata = results.meta;
        resolve(results);
        this.refreshModal();
      });
    });
  }

  refreshModal () {
    run('afterRender', () => {
      $(this.modalId).modal('refresh');
    });
  }

  didRender () {
    super.model(...arguments);
    this.refreshModal();
  }

  @action
  addDocument (file) {
    if (this.singleDoc) {
      this.selectedDocument = file;
      return;
    }
    this.selectedDocuments.addObject(file);
    this.refreshModal();
  }

  @action
  removeDocument (file) {
    if (this.singleDoc) {
      this.selectedDocument = null;
      return;
    }
    this.selectedDocuments.removeObject(file);
    this.refreshModal();
  }

  @action
  assign () {
    $(this.modalId).modal('hide');
    if (this.singleDoc) {
      this.onSelected(this.selectedDocument);
      return;
    }
    this.onSelected(this.selectedDocuments);
  }

  @action
  selectDocuments () {
    $(this.modalId)
    .modal({ detachable: true })
    .modal('show');
  }

  @action
  notify (type, msg) {
    this.onNotify(type, msg);
  }

  @action
  addedFile (file) {
    if (this.fileIsAdded) {
      this.send('removeFile', this.fileIsAdded);
    }

    this.fileIsAdded = file;
  }

  @action
  processQueue () {
    Dropzone.forElement(this.dropzoneId).processQueue();
  }

  @action
  uploadedFile (file, res) {
    res.files = [ res.file ];
    delete res.file;
    this.store.pushPayload(res);
    this.resolveUpload(this.store.peekRecord('file', res.files[0].id));
    this.send('removeFile', file);
  }

  @action
  removeFile (file) {
    Dropzone.forElement(this.dropzoneId).removeFile(file);
    this.fileIsAdded = false;
  }

  @action
  async uploadFile () {
    // this.ajaxStart();
    let { success, error } = this.data.createStatus();

    let autoTag = this.autoTag,
        //LINE BELOW THIS DOESN'T WORK IN OCTANE
        promise = new Promise(resolve => this.set('resolveUpload', resolve));

    this.send('processQueue');//CALL THIS.PROCESSQUEUE??

    let file = await promise,
        properties = [ 'title', 'description', 'tags' ];

    if (this.correctiveAction) {
      properties.push('correctiveAction', 'systemUse');
    }

    properties.forEach(prop => {
      if (prop === 'title') {
        file.prop = this.fileName;
      } else {
        file.prop = this.prop;
      }
    });

    if (autoTag) {
      file.tags = Array.isArray(autoTag) ? autoTag : [ autoTag ];
    } else {
      file.tags = [];
    }

    try {
      await file.save();
    } catch (e) {
      error(e);
      return;
    }

    success('Succesfully uploaded document.');
    this.send('addDocument', file);
    this.showDocumentUpload = false;
  }
}
