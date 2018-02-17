import Component from '@ember/component';
import bubbleTo from 'granite/utils/bubble-action';

export default Component.extend({
  actions: {
    select: bubbleTo('onSelect'),
    create: bubbleTo('onCreate')
  }
});
