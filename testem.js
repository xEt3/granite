'use strict';

/* eslint-env node */
module.exports = {
  test_page:                  'tests/index.html?hidepassed',
  disable_watching:           true,
  browser_disconnect_timeout: 120,
  browser_start_timeout:      120,

  launch_in_ci: [
    'bs_win10_edge16',
    'bs_win10_chromelatest',
    'bs_osxmojave_chromelatest',
    'bs_osxmojave_safari12',
    'bs_win10_firefoxlatest'
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
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
        '--mute-audio',
        '--remote-debugging-port=0',
        '--window-size=1440,900'
      ].filter(Boolean)
    }
  },

  launchers: {
    bs_win10_edge16: {
      exe:      'node_modules/.bin/browserstack-launch',
      args:     [ '--os', 'Windows', '--osv', '10', '--b', 'edge', '--bv', '16.0', '--u' ],
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
    bs_osxmojave_safari12: {
      exe:      'node_modules/.bin/browserstack-launch',
      args:     [ '--os', 'OS X', '--osv', 'Mojave', '--b', 'Safari', '--bv', '12.0', '--u' ],
      protocol: 'browser'
    },
    bs_win10_firefoxlatest: {
      exe:      'node_modules/.bin/browserstack-launch',
      args:     [ '--os', 'Windows', '--osv', '10', '--b', 'firefox', '--bv', 'latest', '-t', '600', '--u' ],
      protocol: 'browser'
    }
    // SL_MicrosoftEdge_public_16_16299_Windows_10: {
    //   'exe': 'ember',
    //   'args': [
    //     'sauce:launch',
    //     '-b',
    //     'MicrosoftEdge',
    //     '-v',
    //     '16.16299',
    //     '--visibility',
    //     'public',
    //     '-p',
    //     'Windows 10',
    //     '--attach',
    //     '--no-connect',
    //     '--url'
    //   ],
    //   'protocol': 'browser'
    // },
    //
    // SL_chrome_public_56_0_Windows_10: {
    //   'exe': 'ember',
    //   'args': [
    //     'sauce:launch',
    //     '-b',
    //     'chrome',
    //     '-v',
    //     '56.0',
    //     '--visibility',
    //     'public',
    //     '-p',
    //     'Windows 10',
    //     '--attach',
    //     '--no-connect',
    //     '--url'
    //   ],
    //   'protocol': 'browser'
    // },
    //
    // SL_chrome_public_beta_Windows_10: {
    //   'exe': 'ember',
    //   'args': [
    //     'sauce:launch',
    //     '-b',
    //     'chrome',
    //     '-v',
    //     'beta',
    //     '--visibility',
    //     'public',
    //     '-p',
    //     'Windows 10',
    //     '--attach',
    //     '--no-connect',
    //     '--url'
    //   ],
    //   'protocol': 'browser'
    // },
    //
    // SL_chrome_public_65_0_Windows_10: {
    //   'exe': 'ember',
    //   'args': [
    //     'sauce:launch',
    //     '-b',
    //     'chrome',
    //     '-v',
    //     '65.0',
    //     '--visibility',
    //     'public',
    //     '-p',
    //     'Windows 10',
    //     '--attach',
    //     '--no-connect',
    //     '--url'
    //   ],
    //   'protocol': 'browser'
    // },
    //
    // SL_firefox_public_59_0_Windows_10: {
    //   'exe': 'ember',
    //   'args': [
    //     'sauce:launch',
    //     '-b',
    //     'firefox',
    //     '-v',
    //     '59.0',
    //     '--visibility',
    //     'public',
    //     '-p',
    //     'Windows 10',
    //     '--attach',
    //     '--no-connect',
    //     '--url'
    //   ],
    //   'protocol': 'browser'
    // },
    //
    // SL_safari_public_11_0_macOS_10_13: {
    //   'exe': 'ember',
    //   'args': [
    //     'sauce:launch',
    //     '-b',
    //     'safari',
    //     '-v',
    //     '11.1',
    //     '--visibility',
    //     'public',
    //     '-p',
    //     'macOS 10.13',
    //     '--attach',
    //     '--no-connect',
    //     '--url'
    //   ],
    //   'protocol': 'browser'
    // }
  }
};
