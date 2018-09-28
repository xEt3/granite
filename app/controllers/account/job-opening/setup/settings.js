import Controller from '@ember/controller';
import { computed, set } from '@ember/object';
import { jobTypes } from 'granite/config/statics';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

export default Controller.extend(addEdit, {
  jobTypes,
  auth:           service(),
  customPipeline: null,

  campaignSettingsForm: computed(() => [{
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
    label:       'Send confirmation email to applicants',
    type:        'checkbox',
    inputClass:  'toggle',
    path:        'sendApplicantConfirmation',
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
  }]),

  jobSettingsForm: computed(() => [{
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
  }]),

  canAddStages: computed('customPipeline.stages.length', function () {
    return this.get('customPipeline.stages.length') < 5 ? true : false;
  }),

  actions: {
    toggleCustomPipeline () {
      if (this.get('customPipeline')) {
        console.log('there is a custom pipeline, deleting it');
        //set customPipeline to null
        this.set('customPipeline', null);
      } else {
        let x = this.store.createRecord('recruiting-pipeline', {
          company:     this.get('auth.user.company.id'),
          jobOpenings: [ this.get('model') ],
          stages:      this.get('defaultPipeline.stages')
        });
        this.set('customPipeline', x);

      }

    },

    reorderItems (items) {
      let customPipeline = this.get('customPipeline');
      items.map((stage, i) => {
        const prevIndex = stage.order;
        if (prevIndex !== i) {
          set(stage, 'order', i);
        }
      });
      customPipeline.set('stages', items);
    },

    openStageModal () {
      this.set('respondedStageAddition', false);
      if (!this.get('editingStage')) {
        this.send('addStage');
      }
      $('#modal__add-stage').modal({
        context:    '.ember-application',
        detachable: true,
        onHidden:   () => {
          if (!this.get('respondedStageAddition')) {
            this.send('respondStageAddition', false);
          }
        }
      }).modal('show');
      return new Promise((resolveStage, rejectStage) => this.setProperties({
        resolveStage,
        rejectStage
      }));
    },

    addStage () {
      let stage = { order: this.get('customPipeline.stages').length };
      this.set('currentStage', stage);
      this.get('customPipeline.stages').addObject(stage);
    },

    removeStage (stage) {
      this.get('customPipeline.stages').removeObject(stage);
    },

    respondStageAddition (response) {
      this.get(response ? 'resolveStage' : 'rejectStage')(response);
      this.set('respondedStageAddition', true);
      $('#modal__add-stage').modal('hide');
      let currentStage = this.get('currentStage');
      if (!response && !this.get('editingStage')) {
        this.send('removeStage', currentStage);
      }
      this.set('editingStage', false);
    }
  }
});
