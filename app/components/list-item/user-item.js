import Ember from 'ember';

const { Component } = Ember;

let UserItemComponent = Component.extend({
  classNames: [ 'item', 'users__user--item' ],

  actions: {
  }
});

UserItemComponent.reopenClass({
  positionalParams: [ 'user' ]
});

export default UserItemComponent;

/* Usage
  {{list-item/user-item user
    onDelete=(action 'delete')
  }}
*/
