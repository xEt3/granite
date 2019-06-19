import Controller from '@ember/controller';
import del from 'granite/mixins/controller-abstractions/delete';

export default Controller.extend(del, { transitionAfterSave: 'account.employee.index.education' });
