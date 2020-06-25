import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { Promise } from 'rsvp';
import $ from 'jquery';
import objectArrayIsDirty from 'granite/utils/object-array-is-dirty';

export default class AccountSettingsProcessesController extends Controller {
  @service auth
  @service data

  @tracked correctiveActionsDirty = false
  @tracked stagesDirty =            false
  @tracked currentStage =           null
  @tracked currentSeverity =        null
  @tracked editingStage =           false
  @tracked editingCas =             false

  get canAddStages () {
    return this.pipeline.stages.length < 5 ? true : false;
  }

  get disableSave () {
    return this.correctiveActionsDirty || this.stagesDirty || this.model.hasDirtyAttributes ? false : true;
  }

  severityForm = [{
    label:       'Name',
    type:        'text',
    path:        'name',
    placeholder: 'ex. Written Warning'
  }, {
    label:       'Order/Severity',
    type:        'number',
    path:        'order',
    placeholder: 'ex. 1 for verbal warnings',
    inputAttrs:  { min: '1' }
  }, {
    label: 'Is this option formal/written?',
    type:  'checkbox',
    path:  'formal'
  }]

  stageForm = [{
    label:       'Name of stage',
    type:        'text',
    path:        'name',
    placeholder: 'ex. Interview'
  }]

  @action
  afterSave (model) {
    let correctiveActionSeverities = model.correctiveActionSeverities,
        removeDuplicates = [];

    if (correctiveActionSeverities) {
      correctiveActionSeverities.forEach(s => {
        if (!s.id) {
          s.destroy();
          removeDuplicates.push(s);
        }
      });
      correctiveActionSeverities.removeObjects(removeDuplicates);
    }

    this.setProperties({
      correctiveActionsDirty:        false,
      stagesDirty:                   false,
      probationaryPeriodUnitDirty:   false,
      probationaryPeriodAmountDirty: false
    });

    this.send('refreshModel');
  }

  @action
  reorderItems (items) {
    let pipeline = this.pipeline;

    items.map((stage, i) => {
      const prevIndex = stage.order;

      if (prevIndex !== i) {
        stage.order = i;
        //set(stage, 'order', i);
      }
    });

    pipeline.stages = items;
    this.stagesDirty = objectArrayIsDirty(items, this.pipelineInitialState);
  }

  @action
  async save () {
    let { success, error } = this.data.createStatus();
    try {
      if (this.correctiveActionsDirty || this.model.hasDirtyAttributes) {
        await this.model.save();
        success('Successfully saved corrective action severities.');
      }

      if (this.stagesDirty) {
        await this.pipeline.save();
        success('Successfully saved default pipeline stages.');
      }

      this.afterSave(this.model);
    } catch (e) {
      error(e);
    }
  }

  @action
  openSeverityModal () {
    this.respondedSeverityAddition = false;

    if (!this.editingCas) {
      this.addSeverity();
    }

    $('#modal__add-cas').modal({
      context:    '.ember-application',
      detachable: true,
      onHidden:   () => {
        if (!this.respondedSeverityAddition) {
          this.respondSeverityAddition(false);
        }
      }
    }).modal('show');

    return new Promise((resolveSeverity, rejectSeverity) => this.setProperties({
      resolveSeverity,
      rejectSeverity
    }));
  }

  @action
  openStageModal () {
    this.respondedStageAddition = false;

    if (!this.editingStage) {
      this.addStage();
    }

    $('#modal__add-stage').modal({
      context:    '.ember-application',
      detachable: true,
      onHidden:   () => {
        if (!this.respondedStageAddition) {
          this.respondStageAddition(false);
        }
      }
    }).modal('show');

    return new Promise((resolveStage, rejectStage) => this.setProperties({
      resolveStage,
      rejectStage
    }));
  }

  @action
  beginSeverityEdit (currentSeverity) {
    this.setProperties({
      currentSeverity,
      editingCas: true
    });
    this.openSeverityModal();
  }

  @action
  beginStageEdit (currentStage) {
    this.setProperties({
      currentStage,
      editingStage: true
    });
    this.openStageModal();
  }

  @action
  async addSeverity () {
    let user = await this.auth.get('user'),
        severity = await this.store.createRecord('corrective-action-severity', {});

    this.currentSeverity = severity;
    user.get('company.correctiveActionSeverities').addObject(severity);
  }

  @action
  addStage () {
    let stage = { order: this.pipeline.stages.length };

    this.currentStage = stage;
    this.pipeline.stages.addObject(stage);
  }

  @action
  removeSeverity (severity) {
    severity.destroy();
    this.auth.get('user.company.correctiveActionSeverities').removeObject(severity);
    this.correctiveActionsDirty = objectArrayIsDirty(this.model.correctiveActionSeverities.toArray(), this.casInitialState);
  }

  @action
  removeStage (stage) {
    this.pipeline.stages.removeObject(stage);
    this.stagesDirty = objectArrayIsDirty(this.pipeline.stages.toArray(), this.pipelineInitialState);
  }

  @action
  respondSeverityAddition (response) {
    this[response ? 'resolveSeverity' : 'rejectSeverity'](response);
    this.respondedSeverityAddition = true;
    $('#modal__add-cas').modal('hide');

    let currentSeverity = this.currentSeverity;

    if (!response && !this.editingCas) {
      this.removeSeverity(currentSeverity);
    }

    this.editingCas = false;
    this.correctiveActionsDirty = objectArrayIsDirty(this.model.correctiveActionSeverities.toArray(), this.casInitialState);
  }

  @action
  respondStageAddition (response) {
    this[response ? 'resolveStage' : 'rejectStage'](response);
    this.respondedStageAddition = true;
    $('#modal__add-stage').modal('hide');

    let currentStage = this.currentStage;

    if (!response && !this.editingStage) {
      this.removeStage(currentStage);
    }

    this.editingStage = false;
    this.stagesDirty = objectArrayIsDirty(this.pipeline.stages.toArray(), this.pipelineInitialState);
  }
}
