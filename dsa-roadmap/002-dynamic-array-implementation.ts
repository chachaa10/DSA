// Dynamic Array Implementation
// It supports basic add, delete, search, and update operations

// --- Key Point 1: Automatic Expansion and Shrinking ---
// When using a dynamic array in real code, shrinking is also an important optimization. For example, a dynamic array allocates continuous memory for 1000 elements, but you only store 10 elements. Then 990 spaces are idle. To avoid wasting resources, we can reduce the storage space. This is shrinking.
// Here we use a simple expansion and shrinking strategy:
// When the number of elements reaches the capacity of the underlying static array, expand the capacity to 2 times;
// When the number of elements drops to 1/4 of the capacity of the underlying static array, shrink the capacity to 1/2.

// --- Key Point 2: Index Out-of-Bounds Check ---
// In the code below, there are two methods for index checking: `checkElementIndex` and `checkPositionIndex`. Their only difference is `index < size` versus `index <= size`.

// Why can `checkPositionIndex` allow `index == size`? Because `checkPositionIndex` is used for insert operations, and inserting at `index == size` is a valid operation (appending to the end).

// For example, we have an array `nums`. For each existing element, a valid index must satisfy `index < size`:

// ```typescript
// nums = [5, 6, 7, 8]
// index   0  1  2  3
// ```
// But if we want to insert a new element, the valid positions are not the element indexes, but the gaps between indexes:

// ```typescript
// nums = [ | 5 | 6 | 7 | 8 | ]
// index    0   1   2   3   4
// ```
// All these gaps are valid insert positions. So `index == size` is also valid. This is the difference between `checkPositionIndex` and `checkElementIndex`.

// --- Key Point 3: Avoid Memory Leak When Deleting Elements ---
// From the algorithm point of view, we do not care how to handle deleted elements. But in real code, we must be careful about possible memory leaks.
// In my code, whenever I delete an element, I set it to `null`. For example in Java:
// ```java
// public E removeLast(){
//     E deletedVal = data[size - 1];
//
//     // Delete the last element
//     // must set the last element to null, or it will cause memory leak
//     data[size - 1] = null;
//     size--;
//
//     return deletedVal;
// }
// ```

// If you do not run `data[size - 1] = null`, then the reference `data[size - 1]` will still exist. You can still access that object through `data[size - 1]`, so the object is reachable, and its memory will not be freed, causing a memory leak.

// Other languages with garbage collection are similar. You should learn the GC mechanism of the language you use. This is the basic requirement for writing bug-free code.

// --- Other Detail Optimizations ---
// The code below is not a full, production-level implementation. There are many places that can be improved. For example, I use a for loop to copy array data. This is not very efficient. Most languages provide faster array copy methods, such as Java’s `System.arraycopy`.

// But no matter how you optimize, you still need to move data, so the time complexity is still O(n). This article focuses on helping you understand the basic ideas and time complexity of array add/delete/search/update APIs. If you are interested in these details, you can read the standard library source code of your language.

// Dynamic Array Implementation
class DynamicArray<T> {
  private data: T[];
  private size: number;
  private INIT_CAP: number;

  constructor(initCapacity: number) {
    // the underlying array that actually stores the data
    this.data = [];
    // record the current number of elements
    this.size = 0;
    // default initial capacity
    this.INIT_CAP = 1;
    this.init(initCapacity) // initialize the array with the given capacity
  }

  /**
   * Initialize the array with the given capacity
   * @param initCapacity the initial capacity
   */
  private init(initCapacity: number): void {
    const capacity = initCapacity || this.INIT_CAP;
    this.data = new Array(capacity);
    this.size = 0;
  }

  /**
   * Add an element to the end of the array
   * @param element the element to add
   */
  public addLast(element: T): void {
    const cap = this.data.length;

    // check if the capacity of the data array is enough
    if (this.size === cap){
      this.resize(2 * cap);
    }
    // insert element at the end
    this.data[this.size] = element;
    this.size++;
  }

  /**
   * Add an element at the given index
   * @param index the index where the element should be added
   * @param element the element to add
   */
  public add(index: number, element: T): void {
    // check for index out of bounds
    this.checkPositionIndex(index);

    const cap = this.data.length;

    // check if the capacity of the data array is enough
    if (this.size === cap) {
      this.resize(2 * cap);
    }

    // move data data[index..] -> data[index+1..]
    // make space for the new element
    for (let i = this.size -1; i >= index; i--) {
      this.data[i + 1] = this.data[i]!;
    }
    // insert element at the given index
    this.data[index] = element;

    this.size++;
  }

  /**
   * Add an element to the front of the array
   * @param element the element to add
   */
  public addFirst(element: T): void {
    this.add(0, element);
  }

  /**
   * Remove the element at the given index
   * @param index the index of the element to remove
   * @returns the removed element
   */
  public remove(index: number): T {
    this.checkElementIndex(index);

    const cap = this.data.length;

    // can reduce capacity to save space
    if (this.size === Math.floor(cap / 4)) {
      this.resize(Math.floor(cap / 2));
    }

    const deletedVal = this.data[index];

    // move data data[index+1..] -> data[index..]
    for (let i = index +1; i < this.size; i++) {
      this.data[i - 1] = this.data[i]!;
    }

    this.data[this.size - 1] = undefined as unknown as T;
    this.size--;

    return deletedVal!;
  }

  /**
   * Remove the first element from the array
   * @returns the removed element
   */
  public removeFirst(): T {
    return this.remove(0);
  }

  /**
   * Remove the last element from the array
   * @returns the removed element
   */
  public removeLast(): T {
    if (this.size === 0 ){
      throw new Error("NoSuchElementException");
    }

    const cap = this.data.length;

    // can reduce capacity to save space
    if (this.size === Math.floor(cap / 4)) {
      this.resize(Math.floor(cap / 2));
    }

    const deletedVal = this.data[this.size - 1];

    // remove the last element
    // must set the last element to null to prevent memory leaks
    this.data[this.size - 1] = undefined as unknown as T;
    this.size--;

    return deletedVal!;
  }

  // get
  public get(index: number): T {
    this.checkElementIndex(index);
    return this.data[index]!;
  }

  // set
  public set(index: number, element: T): T {
    this.checkElementIndex(index);

    // modify data
    const oldVal = this.data[index];
    this.data[index] = element;
    return oldVal!;
  }

  // utility methods
  public getSize(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  /**
   * Resize the array to the new capacity
   * @param newCap the new capacity
   */
  private resize(newCap: number): void {
    const temp = new Array(newCap);

    for (let i = 0; i < this.size; i++) {
      temp[i] = this.data[i]
    }
    this.data = temp;
  }

  /**
   * Check if the index is a valid index for an element
   * @param index the index to check
   * @returns true if the index is valid, false otherwise
   */
  private isElementIndex(index: number): boolean {
    return index >= 0 && index < this.size;
  }

  /**
   * Check if the index is a valid index for a position to insert an element
   * @param index the index to check
   * @returns true if the index is valid, false otherwise
   */
  private isPositionIndex(index: number): boolean {
    return index >= 0 && index <= this.size;
  }

  private checkElementIndex(index: number): void {
    if (!this.isElementIndex(index)) {
      throw new Error(`Index: ${index}, Size: ${this.size}`);
    }
  }

  private checkPositionIndex(index: number): void {
    if (!this.isPositionIndex(index)) {
      throw new Error(`Index: ${index}, Size: ${this.size}`);
    }
  }

  public display(){
    console.log(`size = ${this.size}, cap = ${this.data.length}`)
    console.log(this.data);
  }
}

// Set  the initial capacity to 3
const array = new DynamicArray<number>(3);

// add 5 elements
for (let i = 0; i <= 4; i++) {
  array.addLast(i);
}
console.log("After adding 5 elements:");
array.display();

console.log("After removing element at index 3:");
array.remove(3);
array.display();

console.log("After adding element 9 at index 1:");
array.add(1, 9);
array.display();

console.log("After adding element 100 at the beginning:");
array.addFirst(100);
array.display();

console.log("After removing the last element:");
array.removeLast();
array.display();

console.log("After getting all elements:");
for (let i = 0; i < array.getSize(); i++) {
  console.log(array.get(i)); // prints elements 0, 1, 9, 100
}
array.display()