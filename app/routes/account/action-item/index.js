import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model () {
    return {
      title: 'Developer Recruiting Project',
      target: 'Sam Harris',
      created: moment('2016/09/10'),
      description: 'Project to find a UX designer for the Granite Project since Exxon has decided to adopt Granite HR exclusively Lolz : )',
      dueOn: moment('2016/11/16'),
      prerequisites: [
      { title: 'Write Job Description for UX Designer',
        checklist: [
          {title: 'Prepare Final Draft'},
          {title: 'Approve Final Draft'}
        ]
      }  
      ]



    }
  }
});
