// Composition over Inheritance
// In software development, composition over inheritance is a design principle that suggests you should build complex objects by combining smaller, focused pieces (composition) rather than building a rigid family tree of classes (inheritance).

// Think of inheritance as "is-a" (e.g., a Car is a Vehicle)
// Think of composition as "has-a" (e.g., a Car has an Engine, Wheels, and a SteeringWheel)

// Here is a real-world example using a User Management System with Typescript.

// The "Bad" Way: Using Inheritance
// Imagine we are building a system with three types of users: a Guest, a Member, and an Admin. We decide to use inheritance to share code.

// Base class
// class User {
// 	constructor(public name: string) {}

// 	browseContent() {
// 		console.log(`${this.name} is browsing content`);
// 	}
// }
// A member "is a" User who can also comment
// class Member extends User {
// 	comment() {
// 		console.log(`${this.name} posted a comment`);
// 	}
// }

// An Admin "is a" Member who can also delete users
// class Admin extends Member {
// 	deleteUser() {
// 		console.log(`${this.name} deleted a user`);
// 	}
// }

// Why this gets 'Bad' (The Problem)
// This looks fine until the business requirements change. What if the product manager says: "We want to hire a Moderator. They should be able to delete users, but they are not regular Members and shouldn't be able to post comments."
// With inheritance, you are stuck in a corner. If `Moderator` extends `Admin`, they get the `comment` ability they shouldn't have. If they extend `User`, you have to copy-paste the `deleteUser` code. This is known as the Design Rigidness or Banana-Gorilla problem (you wanted a banana, but you got a gorilla holding the banana and the entire jungle).

// The "Good" Way: Using Composition
// Instead of forcing users into a rigid family tree, we break their abilities down into small, reusable functions or objects (behaviors), and then compose our users using those pieces.

// 1. Core Interfaces
interface User {
	readonly name: string;
}

interface CanBrowse {
	browseContent(name: string): void;
}

interface CanComment {
	comment(name: string): void;
}

interface CanDelete {
	deleteUser(name: string): void;
}

interface IGuest extends User, CanBrowse {}

interface IMember extends User, CanBrowse, CanComment {}

interface IAdmin extends User, CanBrowse, CanComment, CanDelete {}

interface IModerator extends User, CanBrowse, CanDelete {}

// Implementations of behaviors
class BrowseBehavior implements CanBrowse {
	browseContent(name: string) {
		console.log(`${name} is browsing content`);
	}
}

class CommentBehavior implements CanComment {
	comment(name: string) {
		console.log(`${name} is commenting`);
	}
}

class DeleteBehavior implements CanDelete {
	deleteUser(name: string) {
		console.log(`${name} is deleting a user`);
	}
}

class Guest implements IGuest {
	constructor(
		public name: string,
		private browseBehavior: BrowseBehavior,
	) {}

	browseContent() {
		this.browseBehavior.browseContent(this.name);
	}
}

class Member implements IMember {
	constructor(
		public name: string,
		private browseBehavior: BrowseBehavior,
		private commentBehavior: CommentBehavior,
	) {}

	browseContent() {
		this.browseBehavior.browseContent(this.name);
	}

	comment() {
		this.commentBehavior.comment(this.name);
	}
}

class Admin implements IAdmin {
	constructor(
		public name: string,
		private browseBehavior: BrowseBehavior,
		private commentBehavior: CommentBehavior,
		private deleteBehavior: DeleteBehavior,
	) {}

	browseContent() {
		this.browseBehavior.browseContent(this.name);
	}

	comment() {
		this.commentBehavior.comment(this.name);
	}

	deleteUser() {
		this.deleteBehavior.deleteUser(this.name);
	}
}

class Moderator implements IModerator {
	constructor(
		public name: string,
		private browseBehavior: BrowseBehavior,
		private deleteBehavior: DeleteBehavior,
	) {}

	browseContent() {
		this.browseBehavior.browseContent(this.name);
	}

	deleteUser() {
		this.deleteBehavior.deleteUser(this.name);
	}
}

// Usage
const browseBehavior = new BrowseBehavior();
const commentBehavior = new CommentBehavior();
const deleteBehavior = new DeleteBehavior();

const guest = new Guest("John", browseBehavior);
guest.browseContent();
// guest.comment(); // This would be an error since Guest doesn't have a comment method
console.log("---");

const member = new Member("Jane", browseBehavior, commentBehavior);
member.browseContent();
member.comment();
// member.deleteUser(); // This would be an error since Member doesn't have a deleteUser method
console.log("---");

const admin = new Admin("Bob", browseBehavior, commentBehavior, deleteBehavior);
admin.browseContent();
admin.comment();
admin.deleteUser();
console.log("---");

const moderator = new Moderator("Alice", browseBehavior, deleteBehavior);
moderator.browseContent();
moderator.deleteUser();
// moderator.comment(); // This would be an error since Moderator doesn't have a comment method
console.log("---");
