// Functions can be assigned to variables
const greet = (name: string) => `Hello, ${name}!`;
console.log(greet("Alice")); // Hello, Alice!

// Functions can be stored in arrays
const operations: ((x: number) => number)[] = [
	(x: number) => x + 1,
	(x: number) => x * 2,
	(x: number) => x ** 2,
];

// Iterate over the array and call each function
const value = 3;
for (const op of operations) {
	console.log(`${value} -> ${op(value)}`);
}
// Output:
// 3 -> 4 (3 + 1)
// 3 -> 6 (3 * 2)
// 3 -> 9 (3 ** 2)

// Functions can be passed as arguments (callbacks)
const apply = <T, R>(fn: (x: T) => R, x: T) => fn(x);

// Output: Hello, World
console.log(apply((name) => `Hello, ${name}!`, "World"));

// Output: 10
console.log(apply((x) => x * 2, 5));
