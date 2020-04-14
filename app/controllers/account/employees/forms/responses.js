import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import resource from 'granite/mixins/controller-abstractions/resource';

@classic
export default class ResponsesController extends Controller.extend(resource) {}
