import DS from 'ember-data';
import ApplicationSerializer from './application';

export default class EnrollmentSerializer extends ApplicationSerializer.extend(DS.EmbeddedRecordsMixin) {
  attrs = {
    dependents:    { embedded: 'always' },
    elections:     { embedded: 'always' },
    beneficiaries: { embedded: 'always' }
  }

  enrollmentSerializeKeys = [ 'waivingAll', 'waivingSpouse', 'waivingSpouseReason', 'waivingDependents', 'waivingDependentsReason' ]

  normalize (modelClass, hash) {
    // We need to sub populate the elections arrays' dependents array with actual records
    // so the embedded records are there. Remember that dependents are actually embedded records
    // of enrollment as well. 😎
    hash.elections = hash.elections.map(elect => ({
      ...elect,
      dependents: elect.dependents.map(dep => hash.dependents.find(dependent => dependent._id === dep)).filter(Boolean)
    }));

    this.enrollmentSerializeKeys.forEach(key => {
      hash[key] = hash.waivingBenefits[key];
    });
    delete hash.waivingBenefits;

    return super.normalize(...arguments);
  }

  serialize () {
    let json = super.serialize(...arguments);

    json.elections = json.elections.map(elect => ({
      ...elect,
      dependents: elect.dependents.mapBy('_id')
    }));

    json.waivingBenefits = {};
    this.enrollmentSerializeKeys.forEach(key => {
      json.waivingBenefits[key] = json[key];
      delete json[key];
    });

    return json;
  }
}
