// Object methods
// Earlier we said objects are collections of key-value pairs, and values can be any type. When a value is a function, we typically call it a method of the object.

const calculator = {
	// Property
	result: 0,

	// Methods: values are functions
	add(a: number, b: number) {
		return a + b;
	},
	subtract(a: number, b: number) {
		return a - b;
	},
	multiply(a: number, b: number) {
		return a * b;
	},
	divide(a: number, b: number) {
		return a / b;
	},
};

// Call methods
console.log("Addition: ", calculator.add(3, 5)); // 8
console.log("Subtraction: ", calculator.subtract(10, 3)); // 7
console.log("Multiplication: ", calculator.multiply(4, 6)); // 24
console.log("Division: ", calculator.divide(10, 2)); // 5

// Methods can also be written as arrow functions (no different in simple cases)
const tools = {
	double: (x: number) => x * 2,
	square: (x: number) => x * x,
};

console.log("Double: ", tools.double(5)); // 10
console.log("Square: ", tools.square(5)); // 25

// Object methods are just functions stored as properties on an object, called with the object.methodName() syntax. You'll see this pattern everywhere in JavaScript—console.log(), Math.max(), arr.sort() are all method calls on objects.
