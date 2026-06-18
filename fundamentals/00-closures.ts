// Closure example
function createGreeter(greeting: string): (name: string) => string {
	return (name: string): string => `${greeting}, ${name}!`;
}

const helloGreeter = createGreeter("Hello");
const hiGreeter = createGreeter("Hi");

// Using the helloGreeter
console.log(helloGreeter("Chalex")); // Hello, Chalex!
console.log(helloGreeter("Alex")); // Hello, Alex!

// Same as above but more verbose
// console.log(createGreeter("Hello")("Chalex")); // Hello, Chalex!

// Using the hiGreeter
console.log(hiGreeter("Chalex")); // Hi, Chalex!
console.log(hiGreeter("Alex")); // Hi, Alex!

// Same as above but more verbose
// console.log(createGreeter("Hi")("Chalex")); // Hi, Chalex!

// Closure Counter
function createCounter() {
	let count = 0;
	return () => {
		count++;
		return count;
	};
}

// Using the counter
const counter = createCounter();
// Each call to counter() increments and returns the count
console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

// Creating another counter. Each counter has its own independent count
const anotherCounter = createCounter();
console.log(anotherCounter()); // 1
console.log(anotherCounter()); // 2
console.log(anotherCounter()); // 3

// Closure in sort
const nums = [3, 5, 1, 7, 2, 9, 4, 6, 8];

// sort takes a function that defines the sorting rule
// Return negative: a comes first
// Return positive: b comes first
// Return 0: order unchanged

// Sort ascending
nums.sort((a, b) => a - b);
console.log("Ascending:", nums); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

// Sort descending
nums.sort((a, b) => b - a);
console.log("Descending:", nums); // [9, 8, 7, 6, 5, 4, 3, 2, 1]

// The power of closures: sorting rules can use outer variables
// Key is the value to sort by, value is the priority (lower number = higher priority)
const priorityMap: Record<number, number> = {
	1: 3, // lowest priority
	2: 1, // highest priority
	3: 2, // medium priority
} as const;
const data = [1, 2, 3, 2, 1, 3];

// Sort by the priority defined in the priority object
// Lower priority number means higher priority
data.sort((a, b) => (priorityMap[a] ?? 0) - (priorityMap[b] ?? 0)); // Priority Map Lookup: returns priority value or 0 if not found
console.log("Priority sorted:", data); // [2, 2, 3, 3, 1, 1]
