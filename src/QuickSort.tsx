/**
 * Swaps two values within in an array.
 *
 * @param data
 * @param firstIndex
 * @param secondIndex
 */
const swap = (data: number[], firstIndex: number, secondIndex: number) => {
  return ([data[firstIndex], data[secondIndex]] = [
    data[secondIndex],
    data[firstIndex]
  ]);
};

/**
 * Partition algorithm used to sort a number array.
 *
 * @param data
 * @param left
 * @param right
 */
const partition = (data: number[], left: number, right: number) => {
  let pivot = data[Math.floor((right + left) / 2)];
  while (left <= right) {
    while (data[left] < pivot) {
      left++;
    }
    while (data[right] > pivot) {
      right--;
    }
    if (left <= right) {
      swap(data, left, right);
      left++;
      right--;
    }
  }
  return left;
};

/**
 * Recursive method used to sort a number array.
 *
 * @param data
 * @param left
 * @param right
 */
const recursiveFunction = (data: number[], left: number, right: number) => {
  let index = partition(data, left, right);
  if (left < index - 1) {
    recursiveFunction(data, left, index - 1);
  }
  if (right > index) {
    recursiveFunction(data, index, right);
  }
  return data;
};

/**
 * Sorts a number array through the quick sort algorithm.
 *
 * @param data
 */
export const QuickSort = (data: number[]) => {
  if (data.length > 1) {
    return recursiveFunction(data, 0, data.length - 1);
  }
  return data;
};
