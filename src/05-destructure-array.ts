const arr = [1, 2, 3, 4, 5];

const [first, second, third] = arr;

console.log("Destructured elements:", first, second, third); // 1 2 3

// Use commas to skip certain elements
const [a, , c] = arr;
console.log("Skipped elements:", a, c); // 1 3

// Use rest parameters to collect remaining elements
const [head, ...rest] = arr;
console.log("Head element:", head); // 1
console.log("Rest elements:", rest); // [2, 3, 4, 5]

// Classic trick: swap two variables
let x = 10;
let y = 20;
[x, y] = [y, x];
console.log("Swapped variables:", x, y); // 20 10

// Array destructuring when iterating objects (from the previous section)
const scores = { Alice: 90, Bob: 85 };
for (const [name, score] of Object.entries(scores)) {
	console.log(`${name}: ${score}`);
}

// Spread Operator
// The spread operator ... "unpacks" an array or object. It uses the same ... symbol as rest parameters, but the purpose is different: rest parameters collect, while spread unpacks.

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Copy an array (shallow copy)
const copy = [...arr1];
copy.push(99); // [1, 2, 3, 99]

console.log("Original array:", arr1); // [1, 2, 3] (original array is unchanged)
console.log("Copy array:", copy); // [1, 2, 3, 99] (copy is modified)

// Merge arrays
const merged = [...arr1, ...arr2];
console.log("Merged arrays:", merged); // [1, 2, 3, 4, 5, 6]
console.log("Merged with concat:", arr1.concat(arr2)); // [1, 2, 3, 4, 5, 6]

// Insert elements in the middle
const inserted = [0, ...arr1, 99];
console.log("Inserted elements:", inserted); // [0, 1, 2, 3, 99]

// Spreading Objects
const base = { x: 1, y: 2 };
const extra = { y: 10, z: 3 };

// Copy an object (shallow copy)
const objCopy = { ...base };
console.log("Object copy:", objCopy); // { x: 1, y: 2 }

// Merge Objects (later properties override earlier ones)
const combined = { ...base, ...extra };
console.log("Merged objects:", combined); // { x: 1, y: 10, z: 3 }. Note that y was overridden by the value from extra

const withNew = { ...base, z: 100 };
console.log("Object with new property:", withNew); // { x: 1, y: 2, z: 100 }

// One thing to keep in mind: whether you're spreading arrays or objects, it's always a shallow copy. If the array or object contains nested reference types (like arrays within arrays), only the references are copied, not deep clones. For algorithm problems though, shallow copies are usually all you need.
