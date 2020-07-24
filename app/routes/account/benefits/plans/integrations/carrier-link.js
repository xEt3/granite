import Route from 'granite/core/route';
import { carriers } from 'granite/config';

export default class CarrierLinkRoute extends Route {
 titleToken = 'Link Carrier'

 async model (params) {
   if (!params) {
     return;
   }
   const currentCarrier = await carriers.filter(carrier => carrier.key === params.carrier_key);

   return currentCarrier[0];
 }
}
