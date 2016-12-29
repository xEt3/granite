import Ember from 'ember';
import resource from 'granite/mixins/route-abstractions/resource';

const { Route } = Ember;

export default Route.extend(resource, {
  modelName: 'job-openings'
});
