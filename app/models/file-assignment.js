import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

@classic
export default class FileAssignment extends Model {
  @attr('string')
  cannedType;

  @attr('date')
  cannedSubmitted;

  @attr('string')
  message;

  @attr('boolean', { defaultValue: true })
  signatureRequired;

  @attr('string')
  signature;

  @attr('date')
  readOn;

  @attr('date')
  signedOn;

  @attr('boolean', { defaultValue: true })
  visibleToEmployee;

  @attr('string')
  fileType;

  @belongsTo('employee')
  creator;

  @belongsTo('company')
  company;

  @belongsTo('employee')
  employee;

  @belongsTo('file')
  file;

  @belongsTo('file')
  filledFile;

  @hasMany('file')
  supportingDocuments;

  @attr()
  fillFile; // passthru for pojo data to fill pdf files

  @hasMany('file')
  followups;

  @attr('date')
  effectiveOn; // Placeholder for effective dated changes. This field is only here to pass along to the api

  @attr('date', {
    defaultValue () {
      return new Date();
    }
  })
  created;
}
