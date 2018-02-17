import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import $ from 'jquery';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';

export default Controller.extend(addEdit, del, {
  auth: service(),
  transitionAfterDelete: 'account.employee.index.counseling.issue',
  transitionAfterSave: false,

  followupForm: computed(() => [{
    label: 'Is the issue resolved?',
    type: 'checkbox',
    path: 'didResolve'
  }, {
    label: 'Followup notes',
    type: 'textarea',
    rows: '7',
    path: 'notes',
    placeholder: 'Your notes about this follow up go here.'
  }, {
    label: 'When did you follow up?',
    type: 'date',
    path: 'created',
    inputAttrs: {
      inline: true
    }
  }, {
    label: 'Next follow up date (optional)',
    type: 'date',
    path: 'nextFollowup',
    inputAttrs: {
      inline: true
    }
  }]),

  afterSave (model) {
    model.get('followUps').forEach(f => {
      if (!f.get('id')) {
        f.destroy();
      }
    });
  },

  createFollowup () {
    if (this.get('followup')) {
      this.get('followup').destroyRecord();
    }

    let followup = this.store.createRecord('corrective-action-followup', {
      creator: this.get('auth.user.employee')
    });

    this.set('followup', followup);
    return followup;
  },

  actions: {
    saveFollowup () {
      let followup = this.get('followup'),
          action = this.get('model');

      if (!followup) {
        return;
      }

      if (followup.get('didResolve')) {
        action.setProperties({
          didResolve: true,
          resolutionStatusOn: new Date(),
          followUpOn: followup.get('nextFollowup') || action.get('followUpOn')
        });
      }

      action.get('followUps').addObject(followup);
      this.saveModel()
      .then(() => this.set('followup', null));
    },

    openFollowupModal () {
      this.set('respondedFollowup', false);
      this.createFollowup();

      $('#modal__corrective-action--followup').modal({
        detachable: true,
        onHidden: () => {
          if ( !this.get('respondedFollowup') ) {
            this.send('respondedFollowup', false);

          }
        }
      }).modal('show');

      return new Promise((resolveFollowup, rejectFollowup) => this.setProperties({
        resolveFollowup,
        rejectFollowup
      }));
    },

    respondFollowup (response) {
      this.get(response ? 'resolveFollowup' : 'rejectFollowup')(response ? this.get('followup') : null);
      this.set('respondedFollowup', true);
      $('#modal__corrective-action--followup').modal('hide');
    }
  }
});
