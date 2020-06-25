'use strict';

/* eslint-env node */
module.exports = {
  test_page:                  'tests/index.html?hidepassed',
  disable_watching:           true,
  browser_disconnect_timeout: 120,
  browser_start_timeout:      180,

  launch_in_ci: [
    'bs_win10_edgelatest',
    'bs_win10_chromelatest',
    'bs_osxmojave_chromelatest',
    'bs_osxmojave_safarilatest',
    'bs_win10_firefoxlatest'
    // 'bs_win10_firefoxlatest'
  ],

  launch_in_dev: [
    'Chrome'
  ],

  browser_args: {
    Chrome: {
      ci: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.CI ? '--no-sandbox' : null,
        '--headless',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900'
      ].filter(Boolean)
    }
  },

  launchers: {
    bs_win10_edgelatest: {
      exe:      'node_modules/.bin/browserstack-launch',
      args:     [ '--os', 'Windows', '--osv', '10', '--b', 'edge', '--bv', 'latest', '--u' ],
      protocol: 'browser'
    },
    bs_win10_chromelatest: {
      exe:      'node_modules/.bin/browserstack-launch',
      args:     [ '--os', 'Windows', '--osv', '10', '--b', 'chrome', '--bv', 'latest', '-t', '600', '--u' ],
      protocol: 'browser'
    },
    bs_osxmojave_chromelatest: {
      exe:      'node_modules/.bin/browserstack-launch',
      args:     [ '--os', 'OS X', '--osv', 'Mojave', '--b', 'chrome', '--bv', 'latest', '-t', '600', '--u' ],
      protocol: 'browser'
    },
    bs_osxmojave_safarilatest: {
      exe:      'node_modules/.bin/browserstack-launch',
      args:     [ '--os', 'OS X', '--osv', 'Mojave', '--b', 'Safari', '--bv', 'latest', '--u' ],
      protocol: 'browser'
    },
    bs_win10_firefoxlatest: {
      exe:      'node_modules/.bin/browserstack-launch',
      args:     [ '--os', 'Windows', '--osv', '10', '--b', 'firefox', '--bv', 'latest', '-t', '600', '--u' ],
      protocol: 'browser'
    }
  }
};
