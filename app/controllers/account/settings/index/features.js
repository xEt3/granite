import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class FeaturesController extends Controller.extend(addEdit) {}
