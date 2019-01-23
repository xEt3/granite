import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import add from 'granite/mixins/route-abstractions/add';
import { issueTypes } from 'granite/config/statics';

export default Route.extend(add, {
  titleToken: 'New Issue',
  auth:       service(),
  ajax:       service(),
  modelName:  'employee-issue',

  model () {
    return RSVP.hash({
      issue:      this._super(...arguments),
      issueTypes: this.getIssueTypes(),
      users:      this.get('users')
    });
  },

  getModelDefaults () {
    return RSVP.hash({
      creator:  this.get('auth.user.employee'),
      employee: this.modelFor('account.employee')
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model:      model.issue,
      issueTypes: model.issueTypes,
      users:      model.users
    });
  },

  getIssueTypes () {
    return this.get('ajax').request('/api/v1/employee-issues', {
      data: {
        _distinct: true,
        select:    'type'
      }
    })
    .then(res => A(issueTypes.concat(res)).uniq());
  },

  users: computed(function () {
    // users cannot exclude themselves
    let $nin = [ this.get('auth.user.id') ];
    return this.store.query('company-user', { _id: { $nin } });
  })
});
