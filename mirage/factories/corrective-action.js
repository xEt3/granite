import { Factory } from 'ember-cli-mirage';

export default Factory.extend({

  description: {
    issues:       null,
    expectations: null,
    consequences: 'Failure to meet the above expectations may result in further disciplinary action, up to and including termination.'
  },
  notes:              null,
  followUpNotes:      null,
  didResolve:         false,
  followUpOn:         null,
  resolutionStatusOn: null,
  followUps:          []
});
