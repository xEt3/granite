import Route from 'granite/core/route';
import { A } from '@ember/array';
import moment from 'moment';

export default class HistoryRoute extends Route {
  titleToken = 'History';

  async model (params) {
    const page = params.page;

    let histories = await this.store.query('history', {
      limit:    20,
      targetId: this.modelFor('account.employee').get('id'),
      page:     page ? page - 1 : 0,
      sort:     { created: -1 }
    });

    let historyGroups = A();
    let ensureGroup = day => {
      let found = historyGroups.find(group => moment(day).isSame(moment(group.date), 'day')),
          lastGroup = historyGroups.get('lastObject');

      let groupData = {
        date:    moment(day).startOf('day').toDate(),
        history: A()
      };

      if (!lastGroup) {
        groupData.startOfMonth = true;
        groupData.startOfYear = true;
      } else if (!moment(lastGroup.date).isSame(groupData.date, 'year')) {
        groupData.startOfYear = true;
      } else if (!moment(lastGroup.date).isSame(groupData.date, 'month')) {
        groupData.startOfMonth = true;
      }

      return found ? found : historyGroups.pushObject(groupData);
    };

    histories.forEach(history => {
      let group = ensureGroup(history.created);
      group.history.addObject(history);
    });

    return historyGroups;
  }
}
