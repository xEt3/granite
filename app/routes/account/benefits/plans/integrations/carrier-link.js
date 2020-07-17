import Route from 'granite/core/route';
import { carriers } from 'granite/config';

export default class CarrierLinkRoute extends Route {
 titleToken='Carrier-Link'

 async model (params) {
   if (!params) {
     return;
   }
   const carrier = await carriers.filter(carrier => carrier.key === params.carrier_key);

   return carrier[0];
 }
}
