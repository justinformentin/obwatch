const test = require("tape");
const ObjectWatch = require("../dist/index.cjs.js");
const watcher = ObjectWatch;

test("Updates String property", (t) => {
  t.plan(3);
  const changedKey = "a";
  const originalVal = "Test String";
  const updatedVal = "Updated String";
  function callback(key, oldVal, newVal) {
    t.equal(key, changedKey);
    t.equal(oldVal, originalVal);
    t.equal(newVal, updatedVal);
  }
  const watchedObj = watcher({ a: originalVal }, callback);
  watchedObj[changedKey] = updatedVal;
});

test("Updates Boolean property from True to False", (t) => {
  t.plan(3);
  const changedKey = "a";
  const originalVal = true;
  const updatedVal = false;
  function callback(key, oldVal, newVal) {
    t.equal(key, changedKey);
    t.equal(oldVal, originalVal);
    t.equal(newVal, updatedVal);
  }
  const watchedObj = watcher({ a: originalVal }, callback);
  watchedObj[changedKey] = updatedVal;
});

test("Updates Boolean property from False to True", (t) => {
  t.plan(3);
  const changedKey = "a";
  const originalVal = false;
  const updatedVal = true;
  function callback(key, oldVal, newVal) {
    t.equal(key, changedKey);
    t.equal(oldVal, originalVal);
    t.equal(newVal, updatedVal);
  }
  const watchedObj = watcher({ a: originalVal }, callback);
  watchedObj[changedKey] = updatedVal;
});

test("Updates property to null", (t) => {
  t.plan(3);
  const changedKey = "a";
  const originalVal = "Test";
  const updatedVal = null;
  function callback(key, oldVal, newVal) {
    t.equal(key, changedKey);
    t.equal(oldVal, originalVal);
    t.equal(newVal, updatedVal);
  }
  const watchedObj = watcher({ a: originalVal }, callback);
  watchedObj[changedKey] = updatedVal;
});

test("Updates property to undefined", (t) => {
  t.plan(3);
  const changedKey = "a";
  const originalVal = "Test";
  const updatedVal = undefined;
  function callback(key, oldVal, newVal) {
    t.equal(key, changedKey);
    t.equal(oldVal, originalVal);
    t.equal(newVal, updatedVal);
  }
  const watchedObj = watcher({ a: originalVal }, callback);
  watchedObj[changedKey] = updatedVal;
});


test("Updates object property", (t) => {
  t.plan(3);
  const changedKey = "b";
  const originalVal = "Property";
  const updatedVal = "New Property";
  function callback(key, oldVal, newVal) {
    t.equal(key, changedKey);
    t.equal(oldVal, originalVal);
    t.equal(newVal, updatedVal);
  }
  const watchedObj = watcher({ a: { b: originalVal } }, callback);
  watchedObj.a.b = updatedVal;
});

test("Updates secondary object property", (t) => {
  t.plan(6);
  const changedKey = "b";
  const firstOriginalVal = null;

  const secondOriginalVal = "Secondary Property";
  const secondUpdatedVal = "New Property";

  function callback(key, oldVal, newVal) {
    t.equal(key, changedKey);
    t.equal(oldVal, firstOriginalVal);
    t.equal(newVal._c, secondOriginalVal);
  }
  function secondCallback(key, oldVal, newVal) {
    t.equal(key, "c");
    t.equal(oldVal, secondOriginalVal);
    t.equal(newVal, secondUpdatedVal);
  }
  const watchedObj = watcher({ a: "Test", b: firstOriginalVal }, callback);
  watchedObj.b = watcher({ c: secondOriginalVal }, secondCallback);
  watchedObj.b.c = secondUpdatedVal;
});

test("Updates array property", (t) => {
  t.plan(3);
  const changedKey = "a";
  const originalVal = ['one', 'two', 'three'];
  const updatedVal = ['one', 'two', 'four'];
  function callback(key, oldVal, newVal) {
    t.equal(key, changedKey);
    t.equal(oldVal, originalVal);
    t.equal(newVal, updatedVal);
  }
  const watchedObj = watcher({ a: originalVal }, callback);
  watchedObj.a = updatedVal;
});

test("Updates nested array property", (t) => {
  t.plan(3);
  const changedKey = "b";
  const originalVal = ['one', 'two', 'three'];
  const updatedVal = ['one', 'two', 'four'];
  function callback(key, oldVal, newVal) {
    t.equal(key, changedKey);
    t.equal(oldVal, originalVal);
    t.equal(newVal, updatedVal);
  }
  const watchedObj = watcher({ a: { b: originalVal } }, callback);
  watchedObj.a.b = updatedVal;
});