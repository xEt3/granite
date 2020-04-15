import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import Object from '@ember/object';
import refreshable from 'granite/mixins/refreshable';
import humanizeKey from 'granite/utils/humanize-key-name';

@classic
export default class HistoryReportRoute extends Route.extend(refreshable) {
  titleToken = 'History Report';

  @service
  ajax;

  limit = 5;

  queryParams = {
    field:   { refreshModel: true },
    creator: { refreshModel: true }
  };

  model (params) {
    let controller = this.controller,
        page = controller ? controller.page - 1 : 0,
        employee = this.modelFor('account.employee').get('id');

    if (controller) {
      controller.set('isLoading', true);
    }

    return RSVP.hash({
      history:  this.getHistory(params, employee, page),
      fields:   controller && controller.fields ? controller.fields : this.getFields(),
      creators: this.store.findAll('company-user')
    });
  }

  getFields (employee) {
    return this.ajax.request('api/v1/histories', {
      employee,
      select: 'diff -_id'
    })
    .then(result => {
      return result.history ? result.history.reduce((keys, change) => {
        keys.addObjects(change.diff.map(diff => {
          let path = diff.path.join('.');
          return {
            display: humanizeKey(path),
            value:   path
          };
        }));

        return keys;
      }, A()).uniqBy('display') : [];
    });
  }

  getHistory (params, targetId, page) {
    let controller = this.controller,
        field = params.field;

    let query = {
      page,
      targetId,
      limit:  this.limit,
      select: '-snapshot',
      sort:   { created: -1 }
    };

    if (field && field.length > 0) {
      query['diff.path'] = { $in: field.map(f => f.split('.')) };
    }

    if (params.creator && params.creator.length > 0) {
      query.creatorId = { $in: params.creator };
    }

    return this.store.query('history', query)
    .then(result => {
      if (controller) {
        controller.set('isLoading', false);
      }

      let existingSet = controller && !controller.resetModel ? controller.model : A(),
          diffs = A();

      result.forEach(item => {
        item.get('diff').forEach(diff => {
          if (field && field.length > 0 && !A(field).includes(diff.path.join('.'))) {
            return;
          }

          diffs.pushObject(Object.create({
            diff,
            history: item
          }));
        });
      });

      return {
        records: A(existingSet.toArray()).addObjects(diffs),
        meta:    result.get('meta')
      };
    });
  }

  setupController (controller, model) {
    controller.setProperties({
      model:      model.history.records,
      meta:       model.history.meta,
      fields:     model.fields,
      creators:   model.creators,
      resetModel: false
    });
  }
}
