export const lists = {
  'dqReasons': {
    elements: [{
      label: 'List Item',
      type:  'text',
      path:  'currentItem'
    }],
    listType: 'string'
  },
  'labels': {
    elements: [{
      label: 'Label Text',
      type:  'text',
      path:  'text'
    }, {
      type: 'color',
      path: 'color'
    }],
    listType: 'object'
  }
};
