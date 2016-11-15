import Ember from 'ember';
import d3 from 'd3-selection';
import { tree, hierarchy } from 'd3-hierarchy';

const { Component, RSVP, inject, computed, get, set, on, run } = Ember,
      select = 'name email supervisor';

export default Component.extend({
  tagName: 'svg',
  ajax: inject.service(),
  classNames: [ 'visualization__org-tree' ],
  attributeBindings: [ 'width', 'height' ],

  populateChildNodes (node) {
    let ajax = this.get('ajax');
    set(node, 'children', []);

    return ajax.request('/api/v1/employees', {
      data: {
        select,
        supervisor: get(node, '_id')
      }
    })
    .then(res => {
      let children = res.employee;

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

    return _id ? ajax.request('/api/v1/employees', {
      data: { select, _id }
    })
    .then(res => res.employee[0]) : RSVP.Promise.resolve(null);
  },

  _simulation: computed('baseNode', function () {
    let baseNode = this.get('baseNode'),
        t;

    return this.getParentNode(baseNode)
    .then(parentNode => {
      t = Ember.Object.create(parentNode || baseNode);
      return this.populateChildNodes(t);
    });
  }),

  _baseRender: on('didInsertElement', function () {
    this.setProperties({
      width: this.$().width(),
      height: this.$().height()
    });

    run.next(() => {
      var svg = d3.select('#' + this.get('elementId')),
          width = svg.attr('width'),
          height = svg.attr('height'),
          g = svg.append('g').attr('transform', 'translate(80,0)'),
          t = tree().size([height, width - 160]);
      console.log(g);
      this.setProperties({
        svg,
        tree: t,
        g,
        width,
        height
      });
    });
  }),

  _dataUpdate: computed('_simulation', function () {
    return this.get('_simulation')
    .then(data => {
      run.scheduleOnce('afterRender', () => {
        let root = hierarchy(data),
            g = this.get('g');
        console.log('here', g);
        g.selectAll('.link')
          .data(this.get('tree')(root).descendants().slice(1))
          .enter().append('path')
            .attr('class', 'link')
            .attr('d', d => {
              return 'M' + d.y + ',' + d.x +
                     'C' + (d.y + d.parent.y) / 2 + ',' + d.x +
                     ' ' + (d.y + d.parent.y) / 2 + ',' + d.parent.x +
                     ' ' + d.parent.y + ',' + d.parent.x;
            });

        let node = g.selectAll('.node')
          .data(root.descendants())
          .enter().append('g')
            .attr('class', d => 'node' + (d.children ? ' node--internal' : ' node--leaf'))
            .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')');

        node.append('circle')
            .attr('r', 2.5);

        node.append('text')
            .attr('dy', 3)
            .attr('x', d => d.children ? -8 : 8)
            .style('text-anchor', d => d.children ? 'end' : 'start')
            .text(d => {
              console.log(d);
              return d.data.name.first + ' ' + d.data.name.last
            });
      });
    });
  })
});
