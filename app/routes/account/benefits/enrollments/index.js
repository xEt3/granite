import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class EnrollmentsRoute extends Route {
  @service auth
  @service ajax

   planNames = {
     medical: 'M',
     dental:  'D',
     vision:  'V',
     life:    'L',
     other:   'O'
   }

  queryParams = {
    sortProp:     { refreshModel: true },
    asc:          { refreshModel: true },
    page:         { refreshModel: true },
    showInactive: { refreshModel: true },
    waiveAll:     { refreshModel: true },
    medical:      { refreshModel: true },
    other:        { refreshModel: true },
    dental:       { refreshModel: true },
    vision:       { refreshModel: true },
    life:         { refreshModel: true }
  }

  async model (params) {
    let limit = 20,
        page = (params.page || 1) - 1;

    let activeEnrollmentsQuery = {
      company: await this.auth.get('user.company.id'),
      limit,
      page,
      sort:    { created: -1 }
    };

    activeEnrollmentsQuery.sort[params.sortProp] = params.asc ? -1 : 1;

    if (params.showInactive) {
      activeEnrollmentsQuery.$or = [{ terminationDate: { $not: { $type: 9 } } }, { terminationDate: { $type: 9 } }, { terminationDate: { $type: 10 } }];
    } else {
      activeEnrollmentsQuery.terminationDate = { $not: { $type: 9 } };
      activeEnrollmentsQuery.superseded      = { $not: { $type: 7 } };
      activeEnrollmentsQuery.$or = [{ supersedes: { $not: { $type: 7 } } }, { supersedes: { $type: 7 } }];
    }

    let enrollmentsArray = await this.store.query('enrollment', activeEnrollmentsQuery),
        filteredEnrollments = [],
        { medical, dental, vision, life, waiveAll, other } = params;

    if (medical || dental || vision || life || waiveAll || other) {
      let planFilter = [ medical, dental, vision, life, other ].filter(branch=>!!branch);
      enrollmentsArray.forEach(en=>{
        let types = en.elections.map(election => election.planType);
        return en.elections.map(e => {
          if (!filteredEnrollments.includes(en)) {
            if (waiveAll) {
              if (en.waiveAll || en.waivingDependents.length || en.waivingSpouse) {
                filteredEnrollments.push(en);
              }
              return;
            } else if (planFilter.length > 1 && types.length) {
              let matchingPlans = planFilter.every((el) => {
                return types.indexOf(el) !== -1;
              });
              if (matchingPlans) {
                filteredEnrollments.push(en);
              }
            } else if (planFilter.includes(e.planType) && planFilter.length === 1) {
              filteredEnrollments.push(en);
            }
          }
          return;
        });
      });
      return filteredEnrollments;
    }
    return enrollmentsArray;
  }

  async setupController (controller, model) {
    controller.setProperties({ model });
  }
}
