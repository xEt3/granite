/* eslint-disable ember/no-side-effects */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, set } from '@ember/object';
import { A } from '@ember/array';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import $ from 'jquery';

export default class InputDocumentSelectionModalComponent extends Component {
  @service ajax
  @service store
  @service data
  @tracked results
  @tracked tags
  @tracked page
  @tracked fileName
  @tracked description

  classNames =        [ 'document__selector' ]
  limit =             10
  page =              1
  debounceSearches =  800
  searchText =        ''
  selectedDocuments = A()
  show =              false
  enableNotify =      false

  constructor () {
    super(...arguments);
    let selected = this.selected,
        selection = A();

    if (selected && !this.singleDoc) {
      selection.addObjects(selected);
    }

    this.selectedDocuments = selection;

    this.getTags()
    .then(tags => {
      if (!this.isDestroyed && !this.isDestroying) {
        this.tags = tags;
      }

      this.getModel();
    });
  }

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

  /* eslint-disable-next-line */
  @action
  searchTermChanged () {
    if (this._searchDebounce) {
      run.cancel(this._searchDebounce);
    }

    this._searchDebounce = run.later(() => {
      this._searchText = this.searchText;
      this.getModel();
      this._searchDebounce = null;
    }, this.debounceSearches);
  }

  @action
  async getModel () {
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
      set(this, 'page', 1);
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

    let { success, error } = this.data.createStatus('working', false);

    try {
      let results = await this.store.query('file', query);
      this.results = results;
      this.metadata = results.meta;
      success();
      this.refreshModal();
    } catch (e) {
      error(e);
    }
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
  async getTags () {
    return await this.ajax.request('/api/v1/files', {
      data: {
        _distinct: true,
        select:    'tags'
      }
    });
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
      this.args.onSelected(this.selectedDocument);
      return;
    }
    this.args.onSelected(this.selectedDocuments);
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
      this.removeFile(this.fileIsAdded);
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
    this.removeFile(file);
  }

  @action
  removeFile (file) {
    Dropzone.forElement(this.dropzoneId).removeFile(file);
    this.fileIsAdded = false;
  }

  @action
  async uploadFile () {
    let { success, error } = this.data.createStatus();

    let autoTag = this.args.autoTag,
        promise = new Promise(resolve => {
          this.resolveUpload = resolve;
        });

    this.processQueue();

    let file = await promise,
        properties = [ 'title', 'description', 'tags' ];

    if (this.correctiveAction) {
      properties.push('correctiveAction', 'systemUse');
    }

    properties.forEach(prop => {
      if (prop === 'title') {
        file[prop] = this.fileName;
      } else {
        file[prop] = this[prop];
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
    this.fileName = null;
    this.description = null;
    this.addDocument(file);
    this.showDocumentUpload = false;
  }
}
