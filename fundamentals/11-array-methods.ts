// Common Array Methods
// Arrays come with a rich set of methods for manipulation. Here are some of the most commonly used ones:
const numbers = [1, 2, 3, 4, 5];

// Push and Pop
numbers.push(6);
console.log(numbers); // [1, 2, 3, 4, 5, 6]
numbers.pop();
console.log(numbers); // [1, 2, 3, 4, 5]

// Shift and Unshift
numbers.unshift(0);
console.log(numbers); // [0, 1, 2, 3, 4, 5]
numbers.shift();
console.log(numbers); // [1, 2, 3, 4, 5]

// Splice (position, deleteCount, ...items): The Swiss army knife of add/remove
// Starting at index 1, delete 2 elements
console.log(`Current array: ${numbers}`);
numbers.splice(1, 2);
console.log(numbers); // [1, 4, 5]

// Add elements at index 1
numbers.splice(1, 0, 2, 3);
console.log(numbers); // [1, 2, 3, 4, 5]

// Slice (start, end): Extract a portion of an array without modifying the original
const sliced = numbers.slice(1, 3);
console.log(sliced); // [2, 3]
console.log(numbers); // [1, 2, 3, 4, 5] (unchanged)