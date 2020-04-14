import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { articles } from 'granite/config/help';

@classic
export default class TopicRoute extends Route {
  titleToken(model) {
    return model.title;
  }

  model(params) {
    return articles[params.topic_slug];
  }
}
