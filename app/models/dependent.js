import Model, { attr } from '@ember-data/model';
// import Validations from './validations/dependent';
import moment from 'moment';

export default class DependentModel extends Model {
  get fullName () {
    const {
      firstName,
      lastName,
      middleName,
      suffixName
    } = this;

    let fullName = '';

    fullName += firstName || '';
    fullName += middleName ? ' ' + middleName : '';
    fullName += lastName ? ' ' + lastName : '';
    fullName += suffixName ? ' ' + suffixName : '';

    return fullName.length > 0 ? fullName : undefined;
  }

  get age () {
    return Math.ceil(moment().diff(this.dateOfBirth, 'years', true));
  }

  get maskedSsn () {
    const numberSsn = (this.ssn || '').replace(/\D/, '');
    return numberSsn.replace(/.*(\d{4})/, '***-**-$1');
  }

  @attr('string', { defaultValue: () => Math.random().toString(36).substr(2, 10) }) idempotencyKey

  @attr('string') firstName
  @attr('string') middleName
  @attr('string') lastName
  @attr('string') suffixName

  @attr('string') relationship
  @attr('string') gender
  @attr('boolean') otherInsurance
  @attr('string') otherInsuranceName
  @attr('date') dateOfBirth
  @attr('string') ssn
}
