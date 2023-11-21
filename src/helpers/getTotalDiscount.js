import sumValueArrayOfObjects from "./sumValueArrayOfObjects";

export default function getTotalDiscount(arr) {
  return sumValueArrayOfObjects(arr, "discount") / arr.length;
}
