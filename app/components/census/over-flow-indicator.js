import Component from '@ember/component';
import { computed } from '@ember/object';


export default Component.extend({
  checking: window.innerWidth,


  didRender () {
    this._super(...arguments);
    let table = document.getElementsByClassName('responsive-table')[0];
    console.log(this);
    let arr = document.getElementsByClassName('huge');
    let view = table.clientWidth + 'px';

    arr[0].style.left = `${view}`;
  },
  table: computed('this.checking', function () {
    console.log('testing', this);
  })
});
