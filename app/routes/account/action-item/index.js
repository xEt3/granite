import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model () {
    return {
      cancelledOn: moment('2016/08/04'),
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
        },
        { title: 'Perform Salary Survey for 2016',
          checklist: [
            {title: 'Gather Sources'},
            {title: 'Compile Data'},
            {title: 'Assess Data'},
            {title: 'Generate Report'}
          ]
        },
        { title: 'Talk to the boss about making a really long description for the action-item',
          checklist: [
            {title: 'Talk'}
          ]
        }
      ],
      participants: [
        { name: 'Sandra Villegas',
          picture: '/assets/mock/avatars/small/1.png',
          isOwner: true
        },
        { name: 'Bryan Edwards',
          picture: '/assets/mock/avatars/small/2.png'
        },
        { name: 'Jackie Swiesz',
          picture: '/assets/mock/avatars/small/3.png'
        }
      ]
    };
  }
});
