import Route from '@ember/routing/route';
import add from 'granite/mixins/route-abstractions/add';

export default Route.extend(add, {
  modelName: 'job'
});
