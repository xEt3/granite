import Route from '@ember/routing/route';
import { articles } from 'granite/config/help';

export default Route.extend({
  model () {
    return articles;
  }
});
