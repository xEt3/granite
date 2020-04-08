/* eslint-disable ember/no-on-calls-in-components */
import Component from '@glimmer/component';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import Object from '@ember/object';
import { get, set, action } from '@ember/object';
import { run } from '@ember/runloop';
import { inject as service } from '@ember/service';
import d3 from 'd3-selection';
import d3Zoom from 'd3-zoom';
import { tree, hierarchy } from 'd3-hierarchy';

const select = 'name email supervisor';

export default class VisualizationsReorganizationTreeComponent extends Component {
  @service ajax

  nodeRadius =     8
  baseNodeRadius = 11
  margin =         {
    top:    40,
    right:  90,
    bottom: 50,
    left:   90
  }

  get removeOriginalNode () {
    return this.args.baseNode.simulate;
  }

  async populateChildNodes (node, base) {
    let ajax = this.ajax,
        baseNode = this.args.baseNode,
        removeOriginalNode = this.removeOriginalNode;
    set(node, 'children', A());

    let res = await ajax.request('/api/v1/employees', {
      data: {
        select,
        supervisor: get(node, '_id')
      }
    });

    let children = res.employee;

    if (removeOriginalNode && get(node, 'simulate')) {
      let populated = await this.populateChildNodes(Object.create(this.args.originalNode));
      populated.children.forEach(child => {
        if (get(child, '_id') !== get(node, '_id')) {
          get(node, 'children').addObject(child);
        }
      });
    }

    if (children && children.length > 0) {
      await RSVP.all(children.map(async child => {
        let _child = baseNode && get(baseNode, '_id') === get(child, '_id') ? Object.create(baseNode) : child;
        if (!base, get(_child, '_id') === get(baseNode, '_id')) {
          return;
        }
        let populated = await this.populateChildNodes(_child);
        let original = this.args.originalNode;
        if (removeOriginalNode && populated.children.length > 0 && original && get(original, '_id') === get(_child, '_id')) {
          populated.children.map(c => {
            if (!A(get(node, 'children')).findBy('_id', get(c, '_id'))) {
              get(node, 'children').push(c);
            }
          });
        } else {
          get(node, 'children').push(populated);
        }
      }));
    }

    set(node, 'children', get(node, 'children').toArray());
    return node;
  }

  simulation () {
    return this.populateChildNodes(Object.create(this.args.baseNode), true);
  }

  @action
  baseRender (element) {
    this.width = element.clientWidth;
    this.height = element.clientHeight;

    return run.next(() => {
      run.scheduleOnce('afterRender', () => {
        let margin = this.margin,
            width  =  margin.right - margin.left,
            height =  margin.top - margin.bottom;

        let zoom = d3Zoom.zoom();

        let svg = d3.select('svg.visualization__org-tree')
            .attr('minwidth', width)
            .attr('minheight', height)
            .call(zoom.on('zoom', () => {
              svg.attr('transform', d3.event.transform);
            }))
            .append('g'),
            g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

        this.svg = svg;
        this.g = g;

        return this.dataUpdate();
      });
    });
  }

  @action
  async dataUpdate () {
    const minimumXSpacing = 135;

    const data = await this.simulation();

    run.scheduleOnce('afterRender', () => {
      let root = hierarchy(data);
      let { g, args: { baseNode: { _id:baseNodeId } }, nodeRadius:nr, baseNodeRadius:bnr, width, height } = this;


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
  }
}
