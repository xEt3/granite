import Ember from 'ember';

const { Component, RSVP, inject, computed, get, set } = Ember,
      select = 'name email supervisor';

export default Component.extend({
  ajax: inject.service(),

  populateChildNodes (node) {
    let ajax = this.get('ajax');
    set(node, 'children', []);

    return ajax.get('/api/v1/employees', {
      data: {
        select,
        supervisor: get(node, '_id')
      }
    })
    .then(res => {
      let children = res.body.employees;

      if ( children && children.length > 0 ) {
        return RSVP.map(children, child =>
          this.populateChildNodes(child)
          .then(populated => get(node, 'children').push(populated))
        )
        .then(() => node);
      } else {
        return RSVP.Promise.resolve(node);
      }
    });
  },

  getParentNode (node) {
    let ajax = this.get('ajax'),
        _id = get(node, 'supervisor');

    return _id ? ajax.get('/api/v1/employees', {
      data: { select, _id }
    })
    .then(res => res.body.employees[0]) : null;
  },

  _simulation: computed('baseNode', function () {
    let baseNode = this.get('baseNode'),
        tree;

    return this.getParentNode(baseNode)
    .then(parentNode => {
      tree = Ember.Object.create(parentNode || baseNode);
      return this.populateChildNodes(tree);
    });
  })
});
