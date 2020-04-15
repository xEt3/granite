import classic from 'ember-classic-decorator';
import { classNames, classNameBindings, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { A } from '@ember/array';
import fileTypes from 'granite/config/mime-types';

@classic
@tagName('i')
@classNameBindings('icon')
@classNames('icon')
class IconForFileComponent extends Component {
  @computed('file.{mimeType,extension}')
  get icon () {
    let m = A(fileTypes).find(f => f.match.test(this.get(`file.${f.strategy}`)));
    return m ? m.icon : 'file';
  }
}

IconForFileComponent.reopenClass({ positionalParams: [ 'file' ] });

export default IconForFileComponent;
