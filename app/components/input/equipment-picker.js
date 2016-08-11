import Ember from 'ember';
import bubbleTo from 'granite/utils/bubble-action';

const { Component } = Ember;

export default Component.extend({
  actions: {
    select: bubbleTo('onSelect'),
    create: bubbleTo('onCreate')
  }
});
