function upperCaseFirst ( str ) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function serializeObject ( object, prefix ) {
  var args = Array.prototype.slice.call(arguments, 2);

  if ( !object || typeof object !== 'object' ) {
    return object;
  }

  var setInside = function ( o, a ) {
    for ( var key in o ) {
      if ( !o.hasOwnProperty(key) ) {
        continue;
      }

      if ( typeof o[key] === 'object' ) {
        setInside(o[key], a ? a + upperCaseFirst(key) : key );
        continue;
      }

      var modifiedKey = a ? a + upperCaseFirst(key) : key;
      object[modifiedKey] = o[key];
    }
    return object;
  };

  args.forEach(function ( objectKey ) {
    if ( !object[objectKey] || typeof object[objectKey] !== 'object' ) {
      return;
    }

    setInside(object[objectKey], prefix ? objectKey : null);
    delete object[objectKey];
  });

  return object;
}
