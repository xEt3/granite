import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  company: null,
  stages : [
    {
      created : moment().subtract(1, 'week'),
      order : 0,
      name : 'Phone Screen',
      _id : '5b72da4a53889f02bd1486db'
    },
    {
      created : moment().subtract(1, 'week'),
      order : 1,
      name : 'Interview',
      _id : '5b72da4a53889f02bd1486dd'
    },
    {
      created : moment().subtract(1, 'week'),
      order : 2,
      name : 'Offer',
      _id : '5b72da4a53889f02bd1486dc'
    }
  ],
  jobOpenings : [],
  created : moment().subtract(1, 'month')
});
