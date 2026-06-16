// Objects and Classes
// Objects in Javascript are used to organize key-value pair data. Think of an object as a box that holds a bunch of named things

// Create an object with curly braces, key-value pairs are separated by commas
let person = {
	name: "Alice",
	age: 18,
	isStudent: true,
};

// Access properties with dot notation
// Output: Alice
console.log(person.name);
// Output: 18
console.log(person.age);

// Access properties with bracket notation (key is a string)
// Output: Alice
console.log(person["name"]);
// Output: 18
console.log(person["age"]);
// Output: true
console.log(person["isStudent"]);

// Modify a property
person.age = 19;
// Output: 19
console.log(person.age);

// Add a property. Warning: Lint error if strict mode is enabled
person.school = "MIT";
// Output: MIT
console.log(person.school);

// Delete a property
delete person.isStudent;
// Output: undefined
console.log(person.isStudent);

// Check if a property exists
// Output: true
console.log("name" in person);
// Output: false
console.log("isStudent" in person);
