function upperCaseFirst (str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function serializeObject (object, prefix) {
  var args = Array.prototype.slice.call(arguments, 2);

  let pre = (a, key) => prefix === 'suffix' ? key + upperCaseFirst(a) : a + upperCaseFirst(key);

  if (!object || typeof object !== 'object') {
    return object;
  }

  var setInside = function (o, a) {
    for (var key in o) {
      if (!Object.prototype.hasOwnProperty.call(o, key)) {
        continue;
      }

      if (typeof o[key] === 'object') {
        setInside(o[key], a ? pre(a, key) : key);
        continue;
      }

      var modifiedKey = a ? pre(a, key) : key;
      object[modifiedKey] = o[key];
    }
    return object;
  };

  args.forEach(function (objectKey) {
    if (!object[objectKey] || typeof object[objectKey] !== 'object') {
      return;
    }

    setInside(object[objectKey], prefix ? objectKey : null);
    delete object[objectKey];
  });

  return object;
}
