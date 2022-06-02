const paramOverride = (object, override) => {
  let mergedObj = {};

  for (var key in object) {
    if (object.hasOwnProperty(key) && override.hasOwnProperty(key)) {
      mergedObj[key] = override[key];
    } else if (object.hasOwnProperty(key)) {
      mergedObj[key] = object[key];
    }
  }
  return mergedObj;
};

export default paramOverride;
