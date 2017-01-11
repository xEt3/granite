import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Validations from './validations/company';
const { computed } = Ember;

export default Model.extend(Validations, {
  name:  attr('string'),
  email: attr('string'),

  addressLine1:   attr('string'),
  addressLine2:   attr('string'),
  addressCity:    attr('string'),
  addressState:   attr('string'),
  addressZipCode: attr('string'),

  contactPhone:      attr('string'),
  contactExtension:  attr('string'),
  contactFirstName:  attr('string'),
  contactMiddleName: attr('string'),
  contactLastName:   attr('string'),

  linkedServices: attr('array'),
  employeeCustomFields: attr('array'),

  urlPrefix: attr('string'),
  collectEEO: attr('boolean'),

  linkedToSlate: computed('linkedServices.[]', function () {
    let services = this.get('linkedServices');
    return services ? services.includes('slate') : false;
  })
});
