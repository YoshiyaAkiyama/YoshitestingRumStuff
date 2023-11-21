export default function sumValueArrayOfObjects(arr, objKey) {
  return arr.reduce(function (a, b) {
    return a + b[objKey];
  }, 0);
}
