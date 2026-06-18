
// Arrays
// There are two types of Arrays: Static Arrays and Dynamic Arrays

// Javascript does not have a way to define static array
// We can use arrays to simulate static arrays for now

const arr = new Array(10);

// assign values using index
arr[0] = 1;
arr[1] = 2;

const a = arr[0];
console.log(`First index: ${a}`);

// We get the special power of arrays: random access. As long as we know the index, we can get its value in O(1) time.

// Add, Delete, Query, and Update
// The main job of a data structure is to add, delete, search, and update elements.

// --- Add ---
// Case 1: Append an element to the end of the array
const arr1 = new Array(10);
for (let i = 0; i < 4; i++) {
  arr1[i] = i;
}

// Now want to add an element 4 to the end of the array
arr1[4] = 4;

// Then add an element 5 to the end of the array
arr1[5] = 5;

// And so on
console.log("Array1:", arr1);


// Case 2: Insert an element in the middle of the array
// Suppose I have an array `arr2` of size 10, and the first 4 spots have values. If I wan to insert a new element at the 3rd position (index 2 `arr2[2]`), what should I do?
// Now, we need to "move data", making space for the new element. The step are as follows:
const arr2 = new Array(10);
for (let i = 0; i < 4; i++) {
  arr2[i] = i;
}
console.log("Array2:", arr2);

// Insert element 666 at the index 2
// Need to move the elements from the index 2 and onwards one step back
// Note that you should iterate the array backwards to avoid overwriting existing elements
// i > 2 because our target index is 2, we have to empty the index 2
for (let i = 4; i > 2; i--) {
  arr2[i] = arr2[i - 1];
}
console.log("Shifted Array2:", arr2);

// Now the 3rd position is free, you can insert the new element
arr2[2] = 666;
console.log("Inserted 666:", arr2);

// Case 3: The array is full
// When you create a static array, its size is fixed. For example, if I create `int arr[10]` (using a 40-byte block of memory), and store 10 elements, what if I want to add one more? There's no room, whether at the end or the middle.
// Some may think, "Just add 4 more bytes after the 40 bytes to fit in the new element, right?"
// That won't work. A block of continuous memory must be allocated all at once. You can't simply grow it later. The space after your array may be used by another program, so you can't just take it.
// So, what should we do? You need to get new, bigger block of memory, copy the original data there, and then add the new element. This is called "expanding" the array.
// For example, I create a new, larger array `int array[20]`. I copy the old 10 elements. Now there's room for more.

/**
 * Fixed-size array implementation with bounds checking
 * Similar to std::array in C++
 *
 * Time Complexity:
 * - Access: O(1)
 * - Search: O(n)
 * - Insert: O(n) - due to shifting elements
 * - Delete: O(n) - due to shifting elements
 *
 * Space Complexity: O(n)
 *
 * Note: This is a fixed-size array, so it cannot be expanded.
 * For dynamic resizing, see DynamicArray implementation.
 *
 * @template T The type of elements in the array
 * @template capacity The fixed capacity of the array (compile-time constant)
 * @template data The underlying array storage
 */
 class StaticArray<T> {
  private readonly data: T[];
  private readonly capacity: number;
  constructor(capacity: number){
    this.data = new Array<T>(capacity);
    this.capacity = capacity;
  }

  set(index: number, value: T): void {
    if (index < 0 || index > this.capacity){
      throw new Error("Index out of bounds");
    }

    if (index === this.capacity) {
      throw new Error("Array is full, cannot insert at index " + index + ". Consider expanding the array first.");
    }

    this.data[index] = value;
  }

  get(index: number): T {
    if (index < 0 || index >= this.capacity){
      throw new Error("Index out of bounds");
    }

    const value = this.data[index];
    if (value === undefined) {
      throw new Error("Index is undefined, array may be corrupted");
    }
    return value;
  }

  // Log the array contents
  toString(): string {
    return JSON.stringify(this.data);
  }
}

const arr3 = new StaticArray<number>(10);
for (let i = 0; i < 10; i++){
  arr3.set(i, i);
}
console.log("Array3:", arr3.toString());

// arr3.set(99, 99); // This will throw an error because index 99 is out of bounds
// console.log("Array3 :", arr3.toString()); // This will not be executed

// Now we want to append an element 10 at the end of the array
// We need to expand the array first
const newArray3 = new StaticArray<number>(20);
for (let i = 0; i < 10; i++) {
  newArray3.set(i, arr3.get(i));
}

// Append the new elements in the new large array
newArray3.set(10, 10);
console.log("Large Array3:", newArray3.toString());


// ---- Delete an element from the array ----
// Case 1: Delete the last element in the array
// Suppose I have array of size 10 with 5 elements. If I want to delete the last element, what should I do?
// This is easy. Just set the last element to a special value to show it is deleted. For this example, let's use -1 as the special value. When we talk about dynamic arrays later, we'll learn better ways to delete elements. The key point is, deleting the last element is just a random access, which takes O(1) time.

const arr4 = new Array(10)
for (let i = 0; i < 5; i++) {
  arr4[i] = i;
}
console.log("Array4:", arr4);

// Remove the last element, temporarily use -1 to represent the deleted element
arr4[4] = -1;
console.log("Array4 after removing last element:", arr4);

// Case 2: Delete an element from the middle of the array
// Suppose I have array of size 10 with 5 elements. If I want to delete the second element (arr[1]), what should I do?
// Again, we need to "move data". Move all elements after the deleted one forward  by one, so the array stays in order.
const arr5 = new StaticArray<number>(10);
for (let i = 0; i < 5; i++) {
  arr5.set(i, i);
}
console.log("Array5:", arr5.toString());

// delete arr[i]
// need to move the elements after arr[i] one position forward
// note that we should traverse the existing elements of the array from left
// to right to avoid overwriting.

for (let i = 1; i < 4; i++) {
  arr5.set(i, arr5.get(i + 1));
}
console.log("Array5 after deleting arr[1]:", arr5.toString());

// set the last element to -1 to indicate deletion
arr5.set(4, -1);
console.log("Array5 after deleting arr[1] and setting last element to -1:", arr5.toString());

// Summary:
// - Inserting at the end: O(1) - just append
// - Inserting at the beginning: O(n) - shift elements
// - Inserting at the middle: O(n) - shift elements

// - Deleting at the end: O(1) - just mark as deleted
// - Deleting at the beginning: O(n) - shift elements forward
// - Deleting at the middle: O(n) - shift elements forward

// - Accessing an element: O(1) - direct index lookup
// - Updating an element: O(1) - direct index lookup


