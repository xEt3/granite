import Model, { attr } from '@ember-data/model';

const SHORT_DESCRIPTION_CHARS = 48;

export default class WebinarModel extends Model {
  @attr('string') title
  @attr('string') description
  @attr('number') price
  @attr('date') created

  get descriptionIsLong () {
    return this.description.length > SHORT_DESCRIPTION_CHARS + 3;
  }

  get shortDescription () {
    return this.descriptionIsLong ?
      `${this.description.substring(0, SHORT_DESCRIPTION_CHARS)}...` :
      this.description;
  }
}
