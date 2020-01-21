import Controller from '@ember/controller';
import {
  Promise
} from 'rsvp';
import {
  computed
} from '@ember/object';
import {
  inject as service
} from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';
export default Controller.extend(addEdit, {
  items: ['llo', 'hahaha', 'test']
});