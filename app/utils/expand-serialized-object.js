function _findMatchingArg ( key, args ) {
  var matchingArg;

  for ( var i = 0; i < args.length; i++ ) {
    let pathPrefix = args[i];

    if ( key.indexOf(pathPrefix) > -1 ) {
      matchingArg = pathPrefix;
      break;
    }
  }

  return matchingArg;
}

function _lowerCaseFirst ( str ) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function _remapKeys ( object, newKey, matchingKeys ) {
  object[newKey] = {};

  matchingKeys.forEach(oldKey => {
    object[newKey][_lowerCaseFirst(oldKey.replace(newKey, ''))] = object[oldKey];
    delete object[oldKey];
  });
}

export default function serializeObject ( object ) {
  let args = Array.prototype.slice.call(arguments, 1);

  if ( !object || typeof object !== 'object' ) {
    return object;
  }

  const objectKeys = Object.keys(object);

  objectKeys.forEach(key => {
    let matchingArg = _findMatchingArg(key, args);

    if ( !matchingArg ) {
      return;
    }

    args.splice(args.indexOf(matchingArg), 1);

    let matchingKeys = objectKeys.filter(_key => {
      return _key.indexOf(matchingArg) > -1;
    });

    _remapKeys(object, matchingArg, matchingKeys);
  });

  return object;
}
