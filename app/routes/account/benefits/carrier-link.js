import Route from '@ember/routing/route';
import { carriers } from 'granite/config';

export default Route.extend({
 async model(params){
    if (!params){
      return
    }
    let carrier = await carriers.filter(carrier => carrier.key === params.carrier_key)

    return carrier[0]
    }
});
