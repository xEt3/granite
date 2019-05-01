import Component from '@ember/component';
import { computed } from '@ember/object';

const CustomLabel = Component.extend({
  tagName:           'div',
  classNames:        [ 'ui', 'label' ],
  attributeBindings: [ 'color:style' ],

  color: computed('label.color', function () {
    //MIGHT BE ABLE TO JUST USE ARRAY ALL THE WAY
    let rgb = this.get('label.color').replace(/[^\d,]/g, '').split(','),
        [ r, g, b ] = rgb.map(Number),
        textColor = (r * 299 + g * 587 + b * 114) / 1000 > 123 ? 'black' : 'white';

    return `background-color: ${this.get('label.color')}; color: ${textColor}`;
  })
});

CustomLabel.reopenClass({ positionalParams: [ 'label' ] });

export default CustomLabel;
