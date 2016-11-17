import Ember from 'ember';
import d3 from 'd3-selection';
import { tree, hierarchy } from 'd3-hierarchy';

const { Component, RSVP, inject, computed, get, set, on, run } = Ember,
      select = 'name email jobTitle supervisor';

export default Component.extend({
  tagName: 'svg',
  ajax: inject.service(),
  classNames: [ 'visualization__org-tree', 'visualization__org-tree--full' ],
  attributeBindings: [ 'width', 'height' ],

  nodeRadius: 8,
  baseNodeRadius: 11,
  margin: { top: 40, right: 90, bottom: 50, left: 90 },

  didUpdateAttrs () {
    this._super(...arguments);
    this.get('_dataUpdate');
  },

  populateChildNodes (node, base) {
    let ajax = this.get('ajax'),
        baseNode = this.get('baseNode');

    set(node, 'children', Ember.A());

    return ajax.request('/api/v1/employees', {
      data: {
        select,
        supervisor: get(node, '_id')
      }
    })
    .then(res => {
      let children = res.employee;

      if ( children && children.length > 0 ) {
        return RSVP.map(children, child => {
          let _child = baseNode && get(baseNode, '_id') === get(child, '_id') ? Ember.Object.create(baseNode) : child;
          if ( !base, get(_child, '_id') === get(baseNode, '_id') ) {
            return;
          }
          return this.populateChildNodes(_child)
          .then(populated => get(node, 'children').push(populated));
        });
      } else {
        return RSVP.Promise.resolve();
      }
    })
    .then(() => {
      set(node, 'children', get(node, 'children').toArray());
      return node;
    });
  },

  _simulation: computed('baseNode._id', function () {
    let baseNode = this.get('baseNode');
    return this.populateChildNodes(Ember.Object.create(baseNode), true);
  }),

  _baseRender: on('didInsertElement', function () {
    this.setProperties({
      width: this.$().width(),
      height: this.$().height()
    });

    return run.next(() => {
      let margin = this.get('margin');
      let svg = d3.select('#' + this.get('elementId')),
          width = svg.attr('width') - margin.left - margin.right,
          height = svg.attr('height') - margin.top - margin.bottom,
          g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`),
          t = tree().size([width, height]);

      this.setProperties({
        svg,
        tree: t,
        g,
        width,
        height
      });

      return this.get('_dataUpdate');
    });
  }),

  _dataUpdate: computed('_simulation', 'nodeRadius', 'baseNodeRadius', function () {
    return this.get('_simulation')
    .then(data => {
      run.scheduleOnce('afterRender', () => {
        let root = hierarchy(data),
            g = this.get('g'),
            baseNodeId = this.get('baseNode._id'),
            nr = this.get('nodeRadius'),
            bnr = this.get('baseNodeRadius'),
            treemap = this.get('tree')(root);

        g.selectAll('.link').remove();
        g.selectAll('.node').remove();

        let link = g.selectAll('.link')
          .data(treemap.descendants().slice(1));

        link.exit().remove();
        link.enter().append('path')
              .attr('class', 'link')
            .merge(link)
              .attr('d', d => {
                return 'M' + d.x + ',' + d.y
                + 'C' + d.x + ',' + (d.y + d.parent.y) / 2
                + ' ' + d.parent.x + ',' +  (d.y + d.parent.y) / 2
                + ' ' + d.parent.x + ',' + d.parent.y;
              });

        let nodes = g.selectAll('.node')
          .data(treemap.descendants());

        nodes.exit().remove();
        let node = nodes.enter().append('g');
        node.merge(nodes)
          .attr('class', d => {
            let c = 'node';
            c += d.children ? ' node--internal' : ' node--leaf';

            if ( d.data.deprecating ) {
              c += ' node--deprecating';
            }

            if ( d.data._id === baseNodeId ) {
              c += ' node--base';
            }

            return c;
          })
          .attr('transform', d => 'translate(' + d.x + ',' + d.y + ')');

        // The data DOES get passed down to the circles, and the enter() statement
        // will create a circle child for each data entry
        node.append('circle')
          .attr('r', e => e.data._id === baseNodeId ? bnr : nr)
          .exit().remove();

        node.append('text')
          .attr('dy', '.35em')
          .attr('y', d => {
            let xW = (d.data._id === baseNodeId ? bnr : nr) * 1.5;
            return d.children ? 0 - xW : xW;
          })
          .style('text-anchor', 'middle')
          .text(d => d.data.name.first + ' ' + d.data.name.last)
          .exit().remove();
      });
    });
  })
});
