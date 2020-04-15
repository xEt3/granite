import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import Model from 'ember-data/model';

@classic
export default class NewController extends Controller.extend(addEdit) {
  transitionAfterSave = 'account.employee.index.documents';
  transitionWithModel = false;
  assignments = [];
  enableNotify = false;

  afterSave() {
    this.send('refresh');
  }

  @action
  saveAssignment() {
    for (let i = 0; i < this.assignments.length; i++) {
      let { effectiveOn, signatureRequired, visibleToEmployee  } = this.assignments[i];

      this.assignments[i].setProperties({
        signatureRequired,
        visibleToEmployee,
        effectiveOn
      });

      this.saveModel(this.assignments[i]);
    }
    this.set('assignments', []);
  }

  @action
  async addAssignment(files) {
    let model = this.model;
    const makeAssignment = (inputFile) => {

      let file = inputFile;

      if (!(file instanceof Model)) {
        this.store.pushPayload('file', { file });
        file = this.store.peekRecord('file', file.id);
      }

      let { employee, company, followups } = model;

      let assignment = this.store.createRecord('file-assignment', {
        file,
        company,
        employee,
        followups
      });
      this.assignments.pushObject(assignment);
    };

    let _files = Array.isArray(files) ? files : [ files ];

    for (let i = 0; i < _files.length; i++) {
      try {
        await makeAssignment(_files[i]);
      } catch (e) {
        this.set('enableNotify', true);
        this.ajaxError(e);
        this.set('enableNotify', false);
      }
    }

    this.set('docModalSelection', []);
  }

  @action
  async removeAssignment(assignment) {
    await assignment.destroyRecord();
    this.assignments.removeObject(assignment);
  }
}
