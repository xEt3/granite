import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  pictureExts:     [ 'jpg', 'jpeg', 'png', 'gif', 'tif' ],
  pictureEndpoint: computed('model.id', function () {
    return `/api/v1/employee/${this.get('model.id')}/picture`;
  }),

  actions: {
    uploadedFile (file, res) {
      this.get('model').set('picture', res.employee.picture);
    },

    removeFile (file) {
      // this.get('model').set('picture', undefined);
      file.previewElement.remove();
    }
  }
});
