import Route from '@ember/routing/route';
import resource from 'granite/mixins/route-abstractions/resource';

export default Route.extend(resource, {
  modelName: 'form-response',

  async model ({ form_id }) {
    this.set('query', { form: form_id });
    const responses = await this._super(...arguments);
    return {
      responses,
      form: await this.store.find('form', form_id)
    };
  }
});
