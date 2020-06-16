import Component from '@glimmer/component';
import { A } from '@ember/array';
import titleCase from 'granite/utils/title-case';

export default class DisplayBreadCrumbsComponent extends Component {
  get segments () {
    const path = this.args.currentPath,
          pathSplit = path.split('.'),
          pathLength = pathSplit.length,
          overrides = this.args.overrides;

    let segments = A(),
        linkUntil;

    let mutTitle = t => titleCase([ t.replace(/-/g, ' ') ]);

    pathSplit.forEach((segment, i) => {
      if (segment === 'index') {
        linkUntil = pathSplit.slice(0, i + 1).join('.') + '.';
        return;
      }

      if (i !== 0) {
        segments.pushObject({ divider: true });
      }

      let segmentOverride = overrides.findBy('when', segment);

      segments.pushObject({
        title:       segmentOverride && segmentOverride.overrideName ? segmentOverride.overrideName : mutTitle(segment),
        segmentName: segment,
        link:        linkUntil ? linkUntil + segment : segment,
        last:        i + 1 === pathLength
      });

      linkUntil = pathSplit.slice(0, i + 1).join('.') + '.';
    });

    if (overrides) {
      overrides.forEach(override => {
        let segment = segments.findBy('segmentName', override.when);

        if (segment && override.prepend) {
          let i = segments.indexOf(segment);

          segments.insertAt(i, {
            title:       mutTitle(override.prepend.segment),
            segmentName: override.prepend.segment,
            link:        override.prepend.link,
            last:        false
          });

          segments.insertAt(i + 1, { divider: true });
        }
      });
    }

    return segments;
  }
}
