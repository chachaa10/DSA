// Iterating over objects
// Sometimes you need to loop through all key-value pairs in an object. You can use `Object.keys()`, `Object.values()`, or `Object.entries()`.

const scores: Record<string, number> = {
	Alice: 90,
	Bob: 85,
	Charlie: 92,
};

// Object.keys() gets all keys
console.log(Object.keys(scores)); // [ 'Alice', 'Bob', 'Charlie' ]

// Object.values() gets all values
console.log(Object.values(scores)); // [ 90, 85, 92 ]

// Object.entries() gets all key-value pairs (array of arrays)
console.log(Object.entries(scores)); // [ [ 'Alice', 90 ], [ 'Bob', 85 ], [ 'Charlie', 92 ] ]

// Use for...of to iterate over key-value pairs
for (const [name, score] of Object.entries(scores)) {
	console.log(`${name}: ${score}`);
}
// Output: Alice: 90, Bob: 85, Charlie: 92

// You can also use a traditional for...in loop to iterate over keys but it's less common in modern TypeScript
for (const name in scores) {
	console.log(`${name}: ${scores[name]}`);
}
// Output: Alice: 90, Bob: 85, Charlie: 92
