export default function hexToRgb (hex) {
  const [ r, g, b ] = [ 1, 3, 5 ].map(d => parseInt(hex.substring(d, d + 2), 16));
  return {
    r,
    g,
    b
  };
}
