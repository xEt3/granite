import Route from 'granite/core/route';
import { articles } from 'granite/config/help';

export default class TopicRoute extends Route {
  titleToken (model) {
    return model.title;
  }

  model (params) {
    return articles[params.topic_slug];
  }
}
