import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
label:null,

 type:null,

  options:[],

  trueWeight:null,

 falseWeight:null,

  trueDisqualifies:null,

falseDisqualifies:null,

  allowAdditions: null,

  inlineInput:null,

  multiple: null,

  created:     new Date()
});
