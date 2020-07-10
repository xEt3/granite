import Route from 'granite/core/route';
import { carriers } from 'granite/config';


export default class PlansRoute extends Route {
  titleToken = 'Plans'
    async model () {
      return carriers
    }
}
