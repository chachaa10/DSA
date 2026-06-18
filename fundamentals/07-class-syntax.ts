// The class syntax is a more modern and cleaner way to create objects with similar structure.
// It's like a blueprint for creating objects.
// If you want to create many objects with the same structure, writing out curly braces one by one gets tedious fast. That's what class is for: it's a template for mass-producing objects with the same structure.

class TreeNode {
	val: number;
	left: TreeNode | null;
	right: TreeNode | null;

	// constructor is called automatically when you use the `new` keyword
	constructor(val: number) {
		this.val = val;
		this.left = null;
		this.right = null;
	}

	// Define a method. A Leaf is a node with no children
	isLeaf(): boolean {
		return this.left === null && this.right === null;
	}
}

// Use the new keyword to create an object (instance)
const root = new TreeNode(1);
const leftChild = new TreeNode(2);
const rightChild = new TreeNode(3);

// Build the tree structure through properties
root.left = leftChild;
root.right = rightChild;

// Test the methods
console.log(root.val); // 1
console.log(root.isLeaf()); // false (root has left and right children)
console.log(root.left.val); // 2
console.log(root.right.val); // 3

console.log(leftChild.isLeaf()); // true (leftChild has no children)
console.log(rightChild.isLeaf()); // true (rightChild has no children)

// Null because we didn't set them in the constructor
console.log(leftChild.left); // null - no left child
console.log(leftChild.right); // null - no right child
console.log(rightChild.left); // null - no left child
console.log(rightChild.right); // null - no right child

// The `this` keyword refers to the instance of the class that called the method
class ListNode {
	val: number;
	next: ListNode | null;

	constructor(val: number) {
		this.val = val;
		this.next = null;
	}

	// Print the linked list starting from the current node
	printList() {
		const result: number[] = [];
		// This points to the object that called printList
		let current: ListNode | null = this;
		while (current !== null) {
			result.push(current.val);
			current = current.next;
		}
		console.log(result.join(" -> "));
	}
}

// Build linked list 1 -> 2 -> 3 -> null
const node1 = new ListNode(1);
const node2 = new ListNode(2);
const node3 = new ListNode(3);
node1.next = node2;
node2.next = node3;
node1.printList(); // 1 -> 2 -> 3

// Starting from node2, print the rest of the list
node2.printList(); // 2 -> 3
