interface WatchableObject {
  [key: string]: any;
}

type Callback = (key: string, oldVal: any, newVal: any) => unknown;

export default function ObjectWatch(obj: WatchableObject, cb: Callback) {
  function ObjectCache() {
    Object.keys(obj).forEach((key) => {
      const _key = "_" + key;
      this[_key] = obj[key];
    });
  }

  Object.keys(obj).forEach((k) => {
    if (
      obj[k] !== null &&
      obj[k] !== undefined &&
      typeof obj[k] === "object" &&
      !Array.isArray(obj[k])
    ) {
      Object.defineProperty(ObjectCache.prototype, k, {
        value: ObjectWatch(obj[k], cb),
      });
    } else {
      const _key = "_" + k;
      Object.defineProperty(ObjectCache.prototype, k, {
        set: function(val) {
          if (this[_key] !== val) {
            cb(k, this[_key], val);
            this[_key] = val;
          }
        },
        get: function() {
          return this[_key];
        },
      });
    }
  });

  return new ObjectCache();
}
