import Route from '@ember/routing/route';
import { carriers } from 'granite/config';

export default Route.extend({
  async model(params){
    if (!params){
      return
    }

    return await carriers.reduce(carrier => {
        if (carrier.key === params.carrier_key){
          return carrier
        }
        return
      })
    }
});
