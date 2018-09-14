import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default Service.extend({
  store: service(),
  auth:  service(),

  create (data = {}) {
    let user = this.get('auth.user');

    data.actorType = 'CompanyUser';
    data.actorId = user.get('id');
    data.company = user.get('company');

    let activity = this.get('store').createRecord('activity', data);
    return activity.save();
  }
});

/*
Ember.Controller.extend({
  activity: Ember.inject.service(),
  myFn () {
    this.get('activity').create({
      description: '{{actor}} is 33% complete onboarding {{target.fullName}}',
      icon: ''
      target: { doc: someModel }
    })
    .then(activity => {
      // Something
    });
  }
})
 */
