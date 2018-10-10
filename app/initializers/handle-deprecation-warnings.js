import ENV from 'granite/config/environment';
import {
  registerDeprecationHandler,
  registerWarnHandler
} from '@ember/debug';

export function initialize () {
  registerDeprecationHandler((message, options, next) => {
    if (ENV.BUG_THE_HELL_OUTTA_ME) {
      next(message, options);
    }
  });

  registerWarnHandler((message, options, next) => {
    if (ENV.BUG_THE_HELL_OUTTA_ME) {
      next();
    }
  });
}

export default { initialize };
