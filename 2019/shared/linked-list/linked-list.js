/**
 * *** See using-linked-list.js file for implementation ***
 * 
 * Documentation:
 * https://dev.to/emmawedekind/creating-linked-lists-with-javascript-391e
 * https://codepen.io/emmawedekind/pen/zXbWzq?editors=0011
 * 
 * Info: 
 * Unlike an array, a linked list doesn’t provide constant-time access to specific indices within the list. 
 * So if you need the third element in the list, you have to iterate past the first and second nodes to reach it.
 * 
 * One benefit of a linked list is the ability to add and remove items from the beginning and end of the list in constant time.
 * 
 * Five Methods Explained:
    * push(value): Pushes a value on to the end of the linked list
    * pop(): Pops off the last value from the list
    * get(index): Returns an object containing an item from a given index (plus the next two (nested))
    * delete(index): Deletes an item from a given index
    * isEmpty(): Returns a boolean indicating whether the list is empty
    * printList(): A method, not native to linked lists, which will print out our list; it’s primarily for debugging
 */


function Node(value) {
  return {
    value, // Note: we can just declare value instead of value:value since they have the same name
    next: null
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  isEmpty() {
    return this.length === 0;
  }

  // used for debugging
  printList() {
    const nodes = [];
    let current = this.head;
    while(current) {
      nodes.push(current.value);
      current = current.next;
    }
    return nodes.join(' -> ');
  }

  push(value) {
    const node = Node(value);

    /**
     * If list is empty, we can set the head and tail pointers
     * to the new node and update the length of the list.
     */
    if (this.isEmpty()) {
      this.head = node;
      this.tail = node;
      this.length++;
      return node;
    }
    this.tail.next = node;
    this.tail = node;
    this.length++;
  }

  pop() {
    if (this.isEmpty()) {
      return null;
    }
    const nodeToRemove = this.tail;
    // There's only one node!
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length--;
      return nodeToRemove;
    }

    let currentNode = this.head;
    let secondToLastNode;

    // Start at the front and iterate until
    // we find the second to last node
    while (currentNode) {
      if (currentNode.next === this.tail) {
        // Move the pointer for the second to last node
        secondToLastNode = currentNode;
        break;
      }
      currentNode = currentNode.next;
    }
    // Pop off that node
    secondToLastNode.next = null;
    // Move the tail to the second to last node
    this.tail = secondToLastNode;
    this.length--;

    // Initialized to this.tail
    return nodeToRemove;
  }

  get(index) {
    // Index is outside the bounds of the list
    if (index < 0 || index > this.length) {
      return null;
    }

    if (this.isEmpty()) {
      return null;
    }

    // We're at the head!
    if (index === 0) {
      return this.head;
    }

    let current = this.head;
    let iterator = 0;

    while (iterator < index) {
      iterator++;
      current = current.next;
    }

    return current;
  }

  delete(index) {
    // Index is outside the bounds of the list
    if (index < 0 || index > this.length - 1) {
      return null;
    }

    if (this.isEmpty()) {
      return null;
    }

    if (index === 0) {
      const nodeToDelete = this.head;
      this.head = this.head.next;
      this.length--;
      return nodeToDelete;
    }

    let current = this.head;
    let previous;
    let iterator = 0;

    while (iterator < index) {
      iterator++;
      previous = current;
      current = current.next;
    }
    const nodeToDelete = current;
    // Re-direct pointer to skip the element we're deleting
    previous.next = current.next;

    // We're at the end
    if (previous.next === null) {
      this.tail = previous;
    }

    this.length--;

    return nodeToDelete;
  }

}

exports.LinkedList = LinkedList;