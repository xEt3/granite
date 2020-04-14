import classic from 'ember-classic-decorator';
import DS from 'ember-data';

const { Model, attr, belongsTo } = DS;

@classic
export default class PaymentMethod extends Model {
  @attr('string')
  nonce;

  @belongsTo('company', {
    async:   true,
    inverse: false
  })
  company;

  @attr('date', { defaultValue: () => new Date() })
  created;
}
