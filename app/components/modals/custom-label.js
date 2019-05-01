import Component from '@ember/component';

export default Component.extend({
  colorPickerComponents: {

    palette: true,  // Will be overwritten with true if preview, opacity or hue are true
    preview: true,
    opacity: true,
    hue:     true,

    interaction: {
      hex:   false,
      rgba:  true,
      hsva:  false,
      input: true,
      clear: true,
      save:  true
    }

  },

  actions: {
    handleOnSave (hsva) {
      this.set('currentLabel.color', hsva.toRGBA());
      console.log('just set currentLabel', this.get('currentLabel'));
      //CURRENTLY BEING SET AS ARRAY OF RGBA
    }
  }
});
