import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { hasMany, belongsTo } from 'ember-data/relationships';
import { A } from '@ember/array';
import moment from 'moment';
import hexToRgb from 'granite/utils/hex-to-rgb';
import Validations from './validations/company';

@classic
export default class Company extends Model.extend(Validations) {
  @attr('string') name;

  @attr('string') email;

  @attr('string') ein;

  @attr('string') addressLine1;

  @attr('string') addressLine2;

  @attr('string') addressCity;

  @attr('string') addressState;

  @attr('string') addressZipcode;

  @attr('string') contactPhone;

  @attr('string') contactExtension;

  @attr('string') contactFirstName;

  @attr('string') contactMiddleName;

  @attr('string') contactLastName;

  @attr('Date') deactivatedOn;

  @attr('Date') reactivatedOn;

  @attr('array') linkedServices;

  @attr('array') employeeCustomFields;

  @hasMany('corrective-action-severity') correctiveActionSeverities;

  @attr('string', { defaultValue: () => moment.tz.guess() }) tz;

  @belongsTo('file', {
    async:   true,
    inverse: null
  })
  logo;

  @attr('string') logoUrl;

  @attr('string') logoDominantColor;

  @attr('array') logoPalette;

  @attr('string') probationaryPeriodUnit;

  @attr('number') probationaryPeriodAmount;

  @computed('logoPalette')
  get rgbPalette () {
    const palette = this.logoPalette;
    return palette && palette.length ? palette.map(hexToRgb) : false;
  }

  @attr('date') firstStepsCompletedOn;

  @attr('array', { defaultValue: () => A() }) firstStepsCompleted;

  @attr('array') disqualificationReasons;

  @hasMany('label') labels;

  @attr('string') urlPrefix;

  @attr('boolean') collectEEO;

  @attr('boolean') collectAA;

  @attr('boolean') exposeBetaModules;

  @attr('string') accountBillingPromo;

  @computed('linkedServices.[]')
  get linkedToSlate () {
    let services = this.linkedServices;
    return services ? services.includes('slate') : false;
  }
}
