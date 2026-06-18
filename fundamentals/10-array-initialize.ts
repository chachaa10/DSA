// Arrays
// Arrays are hands down the most fundamental and commonly used data structure in programming. You'll use them in virtually every algorithm and problem.

// Creating and Initializing Arrays
// In TypeScript, you can create and initialize arrays in several ways:
// 1. Literal syntax
const numbers: number[] = [1, 2, 3, 4, 5];
const strings: string[] = ["apple", "banana", "cherry"];
console.log(numbers); // [1, 2, 3, 4, 5]
console.log(strings); // ["apple", "banana", "cherry"]

// 2. Array constructor
const emptyNumbers: number[] = new Array(5); // Creates an array with 5 undefined elements
const filledNumbers: number[] = new Array(3).fill(0); // Creates [0, 0, 0]
console.log(emptyNumbers); // [undefined, undefined, undefined, undefined, undefined]
console.log(filledNumbers); // [0, 0, 0]

// 3. Array.from() method
const fromNumbers: number[] = Array.from({ length: 5 }, (_, i) => i);
console.log(fromNumbers); // [0, 1, 2, 3, 4]

// Check array length
console.log(numbers.length); // 5
console.log(strings.length); // 3
console.log(emptyNumbers.length); // 5
console.log(filledNumbers.length); // 3
console.log(fromNumbers.length); // 5

// Pay special attention to the new Array(5).fill(0) pattern—this is the go-to way to create fixed-length arrays (like dp arrays or visited arrays) when solving problems.
