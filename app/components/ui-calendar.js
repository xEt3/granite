import Ember from 'ember';
import Base from 'semantic-ui-ember/mixins/base';

const { Component } = Ember;

export default Component.extend(Base, {
  module: 'calendar',
  classNames: ['ui', 'calendar']
});
