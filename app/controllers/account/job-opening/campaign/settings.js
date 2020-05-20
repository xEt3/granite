import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Promise } from 'rsvp';
import { jobTypes } from 'granite/config/statics';
import $ from 'jquery';

export default class AccountJobOpeningCampaignSettingsController extends Controller {
  @service data

  @tracked respondedStageAddition
  @tracked currentStage
  @tracked editingStage

  jobTypes = jobTypes
  saveOptions = {
    transitionAfterSave: 'account.job-opening.campaign',
    transitionWithModel: false
  }

  campaignSettingsForm = [{
    label:       'Campaign Name',
    type:        'text',
    path:        'name',
    parentClass: 'sixteen wide column'
  }, {
    label:       'Send notifications to',
    inputClass:  'search multiple',
    type:        'select',
    path:        'subscribers',
    contentPath: 'controller.employees',
    displayKey:  'fullName',
    parentClass: 'eight wide column'
  }, {
    label:       'Additional emails to send notifications',
    inputClass:  'search multiple',
    inputAttrs:  { allowAdditions: true },
    type:        'select',
    selectText:  'Type and hit enter to add email addresses',
    path:        'emailSubscribers',
    parentClass: 'eight wide column'
  }, {
    label:       'Start date (optional, otherwise immediate)',
    type:        'date',
    path:        'startOn',
    parentClass: 'eight wide column'
  }, {
    label:       'End date (optional, otherwise until filled)',
    type:        'date',
    path:        'endOn',
    parentClass: 'eight wide column'
  }, {
    label:       'Due on (optional)',
    type:        'date',
    path:        'dueOn',
    parentClass: 'sixteen wide column'
  }, {
    label:       'Show internally',
    type:        'checkbox',
    inputClass:  'toggle',
    path:        'availableInternally',
    parentClass: 'eight wide column'
  }, {
    label:      'Number of days to delay outside sources',
    type:       'number',
    inputAttrs: {
      min:  0,
      max:  30,
      step: 1
    },
    path:        'internalDuration',
    parentClass: 'eight wide column',
    displayIf:   'availableInternally'
  }, {
    label:      'Positions to fill',
    type:       'number',
    inputAttrs: {
      min:  1,
      step: 1
    },
    path:        'positions',
    parentClass: 'sixteen wide column'
  }, {
    label:       'Send job close notice to unrejected applicants',
    type:        'checkbox',
    inputClass:  'toggle',
    path:        'sendCloseNotice',
    parentClass: 'sixteen wide column'
  }, {
    label:       'Add unrejected applicants to talent pool after filled',
    type:        'checkbox',
    inputClass:  'toggle',
    path:        'allocateTalentPool',
    parentClass: 'sixteen wide column'
  }]

  jobSettingsForm = [{
    label:       'Location',
    inputClass:  'search',
    type:        'select',
    path:        'location',
    contentPath: 'controller.locations',
    displayKey:  'name',
    parentClass: 'eight wide column'
  }, {
    label:       'Job type',
    inputClass:  'search',
    type:        'select',
    path:        'jobType',
    contentPath: 'controller.jobTypes',
    parentClass: 'eight wide column'
  }, {
    label:       'This job has supervisory duties',
    type:        'checkbox',
    inputClass:  'toggle',
    path:        'supervisoryRequirements',
    parentClass: 'sixteen wide column'
  }]

  stageForm = [{
    label:       'Name of stage',
    type:        'text',
    path:        'name',
    placeholder: 'ex. Interview'
  }]

  get canAddStages () {
    return this.customPipeline.stages.length < 5 ? true : false;
  }

  @action
  async toggleCustomPipeline () {
    if (this.customPipeline) {
      await this.customPipeline.destroyRecord();
      // this.customPipeline = null;
      set(this, 'customPipeline', null);
    } else {
      set(this, 'customPipeline', await this.store.createRecord('recruiting-pipeline', {
        company:     await this.auth.get('user.company'),
        jobOpenings: [ this.model ],
        stages:      this.defaultPipeline.stages.map(({ name, order }) => ({
          name,
          order
        }))
      }));
    }
  }

  @action
  saveCustomPipeline () {
    if (this.customPipeline) {
      this.customPipeline.save();
    }
  }

  @action
  reorderItems (items) {
    let customPipeline = this.customPipeline;
    items.map((stage, i) => {
      const prevIndex = stage.order;
      if (prevIndex !== i) {
        // set(stage, 'order', i);
        stage.order = i;
      }
    });
    customPipeline.stages = items;
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

        if (!this || this.isDestroyed || this.isDestroying) {
          $('#modal__add-stage').remove();
        }

        $('#modal__add-stage').appendTo($('#modal__add-stage--placeholder'));
      }
    }).modal('show');
    return new Promise((resolveStage, rejectStage) => {
      this.resolveStage = resolveStage;
      this.rejectStage = rejectStage;
    });
  }

  @action
  addStage () {
    let stage = { order: this.customPipeline.stages.length };
    this.currentStage = stage;
    this.customPipeline.stages.addObject(stage);
  }

  @action
  removeStage (stage) {
    this.customPipeline.stages.removeObject(stage);
  }

  @action
  beginStageEdit (currentStage) {
    this.currentStage = currentStage;
    this.editingStage = true;
    this.openStageModal();
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
  }
}
