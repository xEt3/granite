const makeUtil = pos => {
  return (rgb, per) => {
    const div = per / 100;

    const [ r, g, b ] = Object.keys(rgb).map(k => {
      let v = rgb[k],
          p = v * div;

      v = Math.round(pos ? v + p : v - p);

      return v > 255 ? 255 : v < 0 ? 0 : v;
    });

    return {
      r,
      g,
      b
    };
  };
};

export const darken = makeUtil();
export const lighten = makeUtil(true);
