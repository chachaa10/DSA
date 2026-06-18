// Class Inheritance
// Classes can inherit from other classes using the extends keyword. A subclass automatically gets all the parent's properties and methods, and can add its own.

abstract class Person {
	// Short-hand constructor syntax: directly declares and initializes properties
	constructor(
		protected readonly name: string,
		protected readonly age: number,
	) {}

	public introduce() {
		console.log(`My name is ${this.name}, I'm ${this.age} years old.`);
	}
}

// Student extends Person
class Student extends Person {
	constructor(
		name: string,
		age: number,
		private readonly grade: string,
	) {
		super(name, age);
	}

	public study() {
		console.log(`${this.name} is studying, current grade: ${this.grade}`);
	}
}

// Teacher also extends Person
class Teacher extends Person {
	constructor(
		name: string,
		age: number,
		private readonly subject: string,
	) {
		super(name, age);
	}

	public teach() {
		console.log(`${this.name} is teaching ${this.subject}`);
	}
}

const s = new Student("Alice", 18, "A");
const t = new Teacher("Mr. Zhang", 35, "Math");

// Inherited the introduce method from the parent class
s.introduce(); // My name is Alice, I'm 18 years old.
t.introduce(); // My name is Mr. Zhang, I'm 35 years old.

// Access to protected properties
// console.log(s.name); // Cannot access protected property from outside the class
// console.log(t.name); // Cannot access protected property from outside the class

// Each class has its own method
s.study(); // Alice is studying, current grade: A
t.teach(); // Mr. Zhang is teaching Math

// Key points about inheritance:
// 1. Use extends to create a subclass
// 2. Use super() to call the parent constructor
// 3. Subclasses inherit all public and protected members from the parent
// 4. Subclasses can override parent methods with the same name
// 5. Protected members are accessible in the class and its subclasses, but not from outside

// You won't use inheritance much in algorithm problems, but understanding the concept helps when working with more advanced data structure implementations.
