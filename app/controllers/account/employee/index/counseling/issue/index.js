import Ember from 'ember';
import resource from 'granite/mixins/controller-abstractions/resource';

const { Controller, inject: { service } } = Ember;

export default Controller.extend(resource, {
  auth: service()
});
