import Route from 'granite/core/route';
import Object, { action } from '@ember/object';
import humanizeKey from 'granite/utils/humanize-key-name';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';

export default class AccountEmployeeHistoryReportRoute extends Route {
  @service ajax

  titleToken = 'History Report'
  limit = 5

  queryParams = {
    field:   { refreshModel: true },
    creator: { refreshModel: true }
  }

  async model (params) {
    let controller = this.controller,
        page = controller ? controller.page - 1 : 0,
        employee = this.modelFor('account.employee').id;

    if (controller) {
      controller.isLoading = true;
    }

    return {
      history:  await this.getHistory(params, employee, page),
      fields:   controller && controller.fields ? controller.fields : await this.getFields(),
      creators: await this.store.findAll('company-user')
    };
  }

  @action
  async getFields (employee) {
    let result = await this.ajax.request('/api/v1/histories', {
      employee,
      select: 'diff -_id'
    });
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
  }

  @action
  async getHistory (params, targetId, page) {
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

    let result = await this.store.query('history', query);

    if (controller) {
      controller.isLoading = false;
    }

    let existingSet = controller && !controller.resetModel ? controller.model : A(),
        diffs = A();

    result.forEach(item => {
      item.diff.forEach(diff => {
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
      meta:    result.meta
    };
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
