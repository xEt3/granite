'use strict';

module.exports = {
  extends: 'octane',
  rules:   {
    'self-closing-void-elements':    false,
    'no-curly-component-invocation': {
      requireDash: true,
      allow:       [ 'relative-greeting-time', 'app-version', 'liquid-outlet' ]
    },
    'no-implicit-this': { allow: [ '_', 'relative-greeting-time', 'app-version' ] },
    quotes:             [ 'error', 'double' ]
  },
  ignore: [
    'addon/**'
  ]
};
