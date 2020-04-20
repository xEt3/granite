import Component from '@glimmer/component';
import { A } from '@ember/array';
import fileTypes from 'granite/config/mime-types';

export default class DisplayIconForFileComponent extends Component {
  get icon () {
    let m = A(fileTypes).find(f => f.match.test(this.args.file[f.strategy]));
    return m ? m.icon : 'file';
  }
}

/*
  USAGE
  <Display::IconForFile @file={{this.file}} class="huge"?>
*/
