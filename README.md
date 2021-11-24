# Obwatch

Simple and fast object property watcher.

Turns a regular object into an object that fires a callback every time a property changes.

No dependencies. No Proxies. No dirty checks. No timers.

Purely accessor based.

Only 900 bytes unminified and 400 bytes minified.

Proxies and dirty checks are slower and more resource intensive than a simple get/set. If all you need to do is react to object property changes, using an accessor based implementation is the way to go.

Can be used in the browser and node environments.

## Usage

Node environment

```js
import ObjectWatch from "fast-object-watch";
```

Browser

```html
<script src="https://unpkg.com/simple-object-watcher"></script>
```

## API

### ObjectWatch(object, callback)

#### object

Type `Object`

The object that you want to watch

#### callback

Type: `Function`
Parameters: `(key, oldVal, newVal)`


Pass in an object you want watched, and a function that fires when the watched object's properties changed, which provides the key, old value, and new value of the property changed.

All property values are checked for strict equality. This means:
  1. The callback will only fire when the value has changed with primitive values
  2. The callback will always fire for array property changes, even if the new and old values are identical because of JavaScript's object reference.

Properties added to the watched object will never fire the callback.

## Examples

```js
const obj = {
  color: "blue",
  number: 50,
  bool: true,
  arr: [1, 2, 3],
  obj: { firstProp: "one", secondProp: 2 },
};

const callback = (key, oldVal, newVal) => {
  console.log(key + " changed from " + oldVal + " to " + newVal);
};

const watchedObject = ObjectWatch(obj, callback);

watchedObject.color = "green";
// color changed from blue to green
watchedObject.number = 100;
// number changed from 50 to 100
watchedObject.bool = false;
// bool changed from true to false
watchedObject.arr = [4, 5, 6];
// arr changed from [1,2,3] to [4,5,6]
watchedObject.obj.firstProp = "two";
// firstProp changed from one to two
```

```js
class Example {
  constructor() {
    const obj = {
      color: "blue",
      number: 50,
      bool: true,
      arr: [1, 2, 3],
      obj: { firstProp: "one", secondProp: 2 },
    };
    this.state = ObjectWatch(obj, this.callback);
  }
  callback(key, oldVal, newVal) {
    console.log(key + " changed from " + oldVal + " to " + newVal);
  }
  updateState(key, val) {
    this.obj[key] = val;
  }
}

const example = new Example();
example.updateState("number", 100);
// number changed from 50 to 100
example.state.color = "green";
// color changed from blue to green
```

## Build

```bash
npm run test
npm run bundle
```