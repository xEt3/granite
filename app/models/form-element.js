import classic from 'ember-classic-decorator';
import Model from '@ember-data/model';
import { attr } from '@ember-data/model';
import { A } from '@ember/array';
import Validations from './validations/form-element';


@classic
export default class FormElement extends Model.extend(Validations) {
  @attr('string') label;
  @attr('string') customField;
  @attr('string') field;

  @attr('string') type;

  @attr('array', { defaultValue: () => A() }) options;

  @attr('boolean') required

  @attr('number') trueWeight;

  @attr('number') falseWeight;

  @attr('boolean') trueDisqualifies;

  @attr('boolean') falseDisqualifies;

  @attr('boolean') allowAdditions;

  @attr('boolean') inlineInput;

  @attr('boolean') multiple;

  @attr('date', { defaultValue: () => new Date() }) created;
}
