import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  colorPickerComponents: {
    palette: true,
    preview: true,
    opacity: false,
    hue:     true,

    interaction: {
      hex:   true,
      rgba:  true,
      hsva:  true,
      input: true,
      clear: false,
      save:  false
    }
  },

  labelForPreview: computed('currentLabel.{color.[],text}', function () {
    // MOVE TO QUICK FORM -- ACTUALLY PROBABLY MOVE TO MODAL ON LISTS.HBS
    let label = this.get('currentLabel');

    return {
      color: label && label.color ? label.color : [ 0, 0, 0 ],
      text:  label && label.text ? label.text : 'No text yet'
    };
  }),

  actions: {
    handleOnChange (hsva) {
      if (this.get('currentLabel')) {
        this.set('currentLabel.color', hsva.toRGBA());
      }
    }
  }
});
