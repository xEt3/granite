import Route from '@ember/routing/route';
import { articles } from 'granite/config/help';

export default Route.extend({
  titleToken (model) {
    return model.title;
  },

  model (params) {
    return articles[params.topic_slug];
  }
});
