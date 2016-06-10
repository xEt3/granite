import Ember from 'ember';
import titleCase from 'granite/utils/title-case';

const { Component, computed, A } = Ember;

export default Component.extend({
  classNames: [ 'ui', 'breadcrumb' ],

  segments: computed('currentPath', function () {
    const path = this.get('currentPath'),
          pathSplit = path.split('.'),
          pathLength = pathSplit.length;

    let segments = A(),
        linkUntil;

    pathSplit.forEach((segment, i) => {
      segments.pushObject({
        title: titleCase([segment.replace(/-/g, ' ')]),
        segmentName: segment,
        link: linkUntil ? linkUntil + segment : segment,
        last: i + 1 === pathLength
      });

      linkUntil = pathSplit.slice(0, i + 1).join('.') + '.';

      if ( pathLength !== i + 1 ) {
        segments.pushObject({ divider: true });
      }
    });

    return segments;
  })
});
