import Route from 'granite/core/route';

export default class EditRoute extends Route {
 titleToken = 'edit'

 async model (params) {
   return  await this.store.find('open-enrollment', params.enrollment_id);
 }
}
