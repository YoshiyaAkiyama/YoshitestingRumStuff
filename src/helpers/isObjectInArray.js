export default function isObjectInArray(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (id === arr[i]._id) {
      return true;
    }
  }
  return false;
}
