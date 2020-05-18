import classic from 'ember-classic-decorator';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { A } from '@ember/array';
import Validations from './validations/form-element';


@classic
export default class FormElement extends Model.extend(Validations) {
  @attr('string') label;

  @attr('string') type;

  @attr('array', { defaultValue: () => A() }) options;

  @attr('number') trueWeight;

  @attr('number') falseWeight;

  @attr('boolean') trueDisqualifies;

  @attr('boolean') falseDisqualifies;

  @attr('boolean') allowAdditions;

  @attr('boolean') inlineInput;

  @attr('boolean') multiple;

  @attr('date', { defaultValue: () => new Date() }) created;
}
