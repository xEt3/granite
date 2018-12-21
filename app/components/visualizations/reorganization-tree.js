/* eslint-disable ember/no-on-calls-in-components */
import Component from '@ember/component';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import Object from '@ember/object';
import { computed, get, set } from '@ember/object';
import { run } from '@ember/runloop';
import { on } from '@ember/object/evented';
import { inject as service } from '@ember/service';
import d3 from 'd3-selection';
import d3Zoom from 'd3-zoom';
import { tree, hierarchy } from 'd3-hierarchy';

const select = 'name email supervisor';

export default Component.extend({
  tagName:            'svg',
  ajax:               service(),
  classNames:         [ 'visualization__org-tree' ],
  attributeBindings:  [ 'width', 'height' ],
  removeOriginalNode: computed.reads('baseNode.simulate'),

  nodeRadius:     8,
  baseNodeRadius: 11,
  margin:         {
    top:    40,
    right:  90,
    bottom: 50,
    left:   90
  },

  didUpdateAttrs () {
    this._super(...arguments);
    this.get('_dataUpdate');
  },

  populateChildNodes (node, base) {
    let ajax = this.get('ajax'),
        baseNode = this.get('baseNode'),
        removeOriginalNode = this.get('removeOriginalNode');
    set(node, 'children', A());

    return ajax.request('/api/v1/employees', {
      data: {
        select,
        supervisor: get(node, '_id')
      }
    })
    .then(res => {
      let children = res.employee;

      return (removeOriginalNode && get(node, 'simulate') ?
        this.populateChildNodes(Object.create(this.get('originalNode')))
        .then(populated => {
          populated.children.forEach(child => {
            if (get(child, '_id') !== get(node, '_id')) {
              get(node, 'children').addObject(child);
            }
          });
        }) :
        RSVP.Promise.resolve())
      .then(() => {
        if (children && children.length > 0) {
          return RSVP.map(children, child => {
            let _child = baseNode && get(baseNode, '_id') === get(child, '_id') ? Object.create(baseNode) : child;
            if (!base, get(_child, '_id') === get(baseNode, '_id')) {
              return;
            }
            return this.populateChildNodes(_child)
            .then(populated => {
              let original = this.get('originalNode');
              if (removeOriginalNode && populated.children.length > 0 && original && get(original, '_id') === get(_child, '_id')) {
                populated.children.map(c => {
                  if (!A(get(node, 'children')).findBy('_id', get(c, '_id'))) {
                    get(node, 'children').push(c);
                  }
                });
              } else {
                get(node, 'children').push(populated);
              }
            });
          });
        } else {
          return RSVP.Promise.resolve();
        }
      })
      .then(() => {
        set(node, 'children', get(node, 'children').toArray());
        return node;
      });
    });
  },

  _simulation: computed('baseNode._id', 'originalNode._id', function () {
    let baseNode = this.get('baseNode');
    return this.populateChildNodes(Object.create(baseNode), true);
  }),

  _baseRender: on('didInsertElement', function () {
    this.setProperties({
      width:  this.$().width(),
      height: this.$().height()
    });

    return run.next(() => {
      run.scheduleOnce('afterRender', () => {
        let margin = this.get('margin'),
            width  =  margin.right - margin.left,
            height =  margin.top - margin.bottom;

        let zoom = d3Zoom.zoom();

        let svg = d3.select('#' + this.get('elementId'))
            .attr('minwidth', width)
            .attr('minheight', height)
            .call(zoom.on('zoom', () => {
              svg.attr('transform', d3.event.transform);
            }))
            .append('g'),
            g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        this.setProperties({
          svg,
          g
        });

        return this.get('_dataUpdate');
      });
    });
  }),


  _dataUpdate: computed('_simulation', 'nodeRadius', 'baseNodeRadius', function () {
    const minimumXSpacing = 135;

    return this.get('_simulation')
    .then(data => {
      run.scheduleOnce('afterRender', () => {
        let root = hierarchy(data),
            g = this.get('g'),
            baseNodeId = this.get('baseNode._id'),
            nr = this.get('nodeRadius'),
            bnr = this.get('baseNodeRadius'),
            width = this.get('width'),
            height = this.get('height');

        if (width / root.height > minimumXSpacing) {
          width = minimumXSpacing * root.height;
        }

        let clust = tree().size([ height, width ])(root);

        g.selectAll('.link').remove();
        g.selectAll('.node').remove();

        let link = g.selectAll('.link')
        .data(clust.descendants().slice(1));

        link.exit().remove();
        link.enter().append('path')
        .attr('class', 'link')
        .merge(link)
        .attr('d', d => {
          return 'M' + d.y + ',' + d.x
                + 'C' + (d.parent.y + 100) + ',' + d.x
                + ' ' + (d.parent.y + 100) + ',' +  d.parent.x
                + ' ' + d.parent.y + ',' + d.parent.x;
        });

        let nodes = g.selectAll('.node')
        .data(clust.descendants());

        nodes.exit().remove();
        let node = nodes.enter().append('g');
        node.merge(nodes)
        .attr('class', d => {
          let c = 'node';
          c += d.children ? ' node--internal' : ' node--leaf';

          if (d.data.deprecating) {
            c += ' node--deprecating';
          }

          if (d.data._id === baseNodeId) {
            c += ' node--base';
          }

          return c;
        })
        .attr('transform', d => 'translate(' + d.y + ',' + d.x + ')');

        // The data DOES get passed down to the circles, and the enter() statement
        // will create a circle child for each data entry
        node.append('circle')
        .attr('r', e => e.data._id === baseNodeId ? bnr : nr)
        .exit().remove();

        node.append('text')
        .attr('x', '1.5em')
        .attr('dy', d => {
          return (d.data._id === baseNodeId ? bnr : nr) / 3;
        })
        .style('text-anchor', 'start')
        .text(d => {
          let n = [],
              { first, last } = d.data.name || {};

          if (first) {
            n.push(first);
          }

          if (last) {
            n.push(last);
          }

          return n.join(' ');
        })
        .exit().remove();
      });
    });
  })
});
