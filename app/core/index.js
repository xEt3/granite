import Route from './route';
import Controller from './controller';
import elementId from './element-id';
import modalSupport from './modal-support';
import FileHandler from './file-handler';
import { action } from '@ember/object';

function authenticated (constructor) {
  return class GraniteAuthenticatedRoute extends constructor {
    authenticationChangeUrl = 'index'

    beforeModel (transition) {
      if (!this.get('auth.authenticated')) {
        this.controllerFor('login').set('previousTransition', transition);
        return this.transitionTo('login');
      }

      this.addObserver('auth.authenticated', this, this.__authenticationStateChanged);

      super.beforeModel(...arguments);
    }

    __authenticationStateChanged () {
      if (this.get('auth.authenticated') === false) {
        this.transitionTo(this.authenticationChangeUrl);
      }
    }

    @action
    willDestroy () {
      try {
        this.removeObserver('auth.authenticated', this, this.__authenticationStateChanged);
      } catch (e) {
        // noop
      }

      super.willDestroy(...arguments);
    }
  };
}

function fileHandling (constructor) {
  return class FileHandlingClass extends constructor {
    constructor () {
      super(...arguments);
      this.files = new FileHandler({
        data:           this.data,
        store:          this.store,
        dropzoneId:     this.dropzoneId,
        fileData:       this.fileData,
        uploadComplete: this.uploadComplete
      });
    }
  };
}

export {
  Route,
  Controller,
  authenticated,
  fileHandling,
  elementId,
  modalSupport
};
