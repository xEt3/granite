export default function bubbleAction ( proxyTo ) {
  return function () {
    this.get(proxyTo).apply(this, arguments);
  };
}

/*
  Usage:

  /components/some-test
  ```javascript
  import bubblesTo from 'granite/utils/bubble-action';

  Ember.Component.extend({
  ...
    actions: {
      saveIt: bubblesTo('mySaveAction')
    }
  });
  ```

  /templates/my-page

  ```html
  {{some-test mySaveAction=(action 'save')}}
  ```

  /controllers/my-page
  ```html
  ...
  actions: {
    save ( args, from, action, helper ) {
      // do something
    }
  }
  ```
 */
