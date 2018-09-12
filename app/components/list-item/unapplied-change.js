import Component from '@ember/component';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';

export default Component.extend(del, addEdit,{
  classNames:   [ 'history__timeline-item', 'card' ],
  enableNotify: false,

  actions: {
    modifyEffectiveDate () {
      let history = this.get('history');
      this.set('history.effectiveOn', new Date());
      this.saveModel(history).then((x) => {
        this.get('onApplyNow')(x);
      });
    }
  }
});
