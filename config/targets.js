/* eslint-env node */
const browsers = [
  'last 1 Chrome versions',
  'last 1 Firefox versions',
  'last 1 Safari versions'
];

const isCI = !!process.env.CI;
const isProduction = process.env.EMBER_ENV === 'production';

if (isCI || isProduction) {
  browsers.push('ie 11');
  browsers.push('samsung 5'); // android 4.4 (older samsung galaxy devices)
}

module.exports = { browsers };
