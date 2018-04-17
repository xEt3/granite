/* eslint-env node */
module.exports = {
  test_page: 'tests/index.html?hidepassed',
  disable_watching: true,

  launch_in_ci: [
    // 'SL_MicrosoftEdge_public_16_16299_Windows_10',
    "SL_chrome_public_56_0_Windows_10",
    "SL_chrome_public_beta_Windows_10",
    "SL_chrome_public_65_0_Windows_10",
    "SL_firefox_public_59_0_Windows_10",
    // "SL_safari_public_11_0_macOS_10_13"
  ],

  launch_in_dev: [
    'Chrome'
  ],

  browser_args: {
    Chrome: {
      mode: 'ci',
      args: [
        // --no-sandbox is needed when running Chrome inside a container
        process.env.TRAVIS ? '--no-sandbox' : null,

        '--disable-gpu',
        '--headless',
        '--remote-debugging-port=0',
        '--window-size=1440,900'
      ].filter(Boolean)
    }
  },

  launchers: {
    SL_MicrosoftEdge_public_16_16299_Windows_10: {
      "exe": "ember",
      "args": [
        "sauce:launch",
        "-b",
        "MicrosoftEdge",
        "-v",
        "16.16299",
        "--visibility",
        "public",
        "-p",
        "Windows 10",
        "--attach",
        "--no-connect",
        "--url"
      ],
      "protocol": "browser"
    },

    SL_chrome_public_56_0_Windows_10: {
      "exe": "ember",
      "args": [
        "sauce:launch",
        "-b",
        "chrome",
        "-v",
        "56.0",
        "--visibility",
        "public",
        "-p",
        "Windows 10",
        "--attach",
        "--no-connect",
        "--url"
      ],
      "protocol": "browser"
    },

    SL_chrome_public_beta_Windows_10: {
      "exe": "ember",
      "args": [
        "sauce:launch",
        "-b",
        "chrome",
        "-v",
        "beta",
        "--visibility",
        "public",
        "-p",
        "Windows 10",
        "--attach",
        "--no-connect",
        "--url"
      ],
      "protocol": "browser"
    },

    SL_chrome_public_65_0_Windows_10: {
      "exe": "ember",
      "args": [
        "sauce:launch",
        "-b",
        "chrome",
        "-v",
        "65.0",
        "--visibility",
        "public",
        "-p",
        "Windows 10",
        "--attach",
        "--no-connect",
        "--url"
      ],
      "protocol": "browser"
    },

    SL_firefox_public_59_0_Windows_10: {
      "exe": "ember",
      "args": [
        "sauce:launch",
        "-b",
        "firefox",
        "-v",
        "59.0",
        "--visibility",
        "public",
        "-p",
        "Windows 10",
        "--attach",
        "--no-connect",
        "--url"
      ],
      "protocol": "browser"
    },

    SL_safari_public_11_0_macOS_10_13: {
      "exe": "ember",
      "args": [
        "sauce:launch",
        "-b",
        "safari",
        "-v",
        "11.0",
        "--visibility",
        "public",
        "-p",
        "macOS 10.13",
        "--attach",
        "--no-connect",
        "--url"
      ],
      "protocol": "browser"
    }
  }
};
