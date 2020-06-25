import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import $ from 'jquery';

export default class AccountEmployeeOffboardReorganizationController extends Controller {
  @service data
  @tracked replacement

  get baseNode () {
    return this.replacementNode || this.originalNode;
  }

  get originalNode () {
    return this.makeNode(this.model, { deprecating: true });
  }

  get confirmModalDeleteContext () {
    return `Are you sure you want to finalize the offboarding for ${this.model.fullName}?`;
  }

  get replacementNode () {
    return this.replacement ? this.makeNode(this.replacement, { simulate: true }) : false;
  }

  @action
  makeNode (object, base = {}) {
    return $.extend(base, {
      _id:  object.id,
      name: {
        first: object.firstName,
        last:  object.lastName
      },
      email:      object.email,
      supervisor: object.belongsTo('supervisor').id()
    });
  }
}
