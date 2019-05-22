import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';

const CustomLabel = Component.extend({
  tagName:           'div',
  classNames:        [ 'ui', 'label' ],
  attributeBindings: [ 'color:style' ],
  classNameBindings: [ 'size' ],

  color: computed('label.color', function () {
    let [ r, g, b ] = this.get('label.color'),
        textColor = (r * 299 + g * 587 + b * 114) / 1000 > 123 ? 'black' : 'white';

    return htmlSafe(`background-color: rgba(${r}, ${g}, ${b}); color: ${textColor}`);
  })
});

CustomLabel.reopenClass({ positionalParams: [ 'label' ] });

export default CustomLabel;

/* Usage

{{custom-label label tagName="span" size="mini"}}

*/
