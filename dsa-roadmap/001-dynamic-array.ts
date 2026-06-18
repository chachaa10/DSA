// Dynamic Arrays
// Unlike static arrays, dynamic arrays can resize themselves automatically when elements are added or removed.

// In JavaScript, arrays are dynamic by default, but we can simulate dynamic arrays using static arrays.

const array = [];
for (let i = 0; i < 10; i++) {
  array.push(i);
}
console.log("Initial array:", array);

// Insert elements in the middle, time complexity O(n) due to shifting elements
// Insert element 666 at index 2
array.splice(2, 0, 666);
console.log("Array after inserting 666 at index 2:", array);

// Insert elements at the beginning, time complexity O(n) due to shifting elements
array.unshift(-1);
console.log("Array after inserting -1 at the beginning:", array);

// Remove the last element, time complexity O(1)
array.pop();
console.log("Array after removing the last element:", array);

// Remove elements in the middle, time complexity O(n) due to shifting elements
// Remove the element at index 2
array.splice(2, 1);
console.log("Array after removing element at index 2:", array);

// Query elements by index, time complexity O(1)
const a = array[0];
console.log("Element at index 0:", a);

// Modify elements by index, time complexity O(1)
array[0] = 1000;
console.log("Array after modifying element at index 0:", array);

// Find index by element value, time complexity O(n)
const index = array.indexOf(666);
console.log("Index of element 666:", index);