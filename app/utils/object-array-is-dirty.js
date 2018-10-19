import { get } from '@ember/object';

export default function objectArrayIsDirty (a = [], b = [], key = 'name') {
  const isDirty = a.length !== b.length || a.some(ax => {
    const matchVal = get(ax, key),
          bitm = b.find(bx => matchVal === get(bx, key));

    if (!bitm) {
      return true;
    }

    return Object.keys(ax).some(axProp =>
      get(bitm, axProp) !== get(ax, axProp)) ||
    Object.keys(bitm).some(bxProp =>
      get(bitm, bxProp) !== get(ax, bxProp));
  });

  return isDirty;
}
