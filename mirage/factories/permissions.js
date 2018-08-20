import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  permissions(){
    return this.permissions={
      created: '2018-04-27T15:19:31.693Z',
      id: '5ae33f839980c183fd063ffa',
      key:'create action items',
      __v:0,
      _id:'5ae33f839980c183fd063ffa'
    }
  }

    // {
  //     created: '2018-04-27T15:19:31.693Z',
  //     id: '5ae33f839980c183fd063ffd',
  //     key:'delete action items',
  //     __v:0,
  //     _id:'5ae33f839980c183fd063ffd'
  //   }, {
  //     created: '2018-04-27T15:19:31.693Z',
  //     id: '5ae33f839980c183fd063ffe',
  //     key:'get action items',
  //     __v:0,
  //     _id:'5ae33f839980c183fd063ffe'
  //
  // }
});
