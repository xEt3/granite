import Route from '@ember/routing/route';
import del from 'granite/mixins/controller-abstractions/delete';

export default Route.extend(del, { transitionAfterSave: 'account.employee.index.education' });
