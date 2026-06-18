// Object Destructuring
// Destructuring assignment is syntactic sugar for quickly extracting values from objects or arrays. It looks like assignment in reverse.

const person = {
	name: "Alice",
	age: 18,
	city: "Beijing",
};

// Extract properties from an object; variable names must match the property
const { name, age } = person;
console.log(name, age); // Alice 18

// Rename: assign the city property to a variable called location
const { city: location } = person;
console.log(location); // Beijing

// Default values: if a property doesn't exist, use the default
const { name: n, score = 100 } = person;
console.log(n, score); // Alice 100

// Practical use case: destructuring function parameters
const introduce = ({ name, age }: { name: string; age: number }) => {
	console.log(`My name is ${name}, I'm ${age} years old`);
};
introduce(person);
