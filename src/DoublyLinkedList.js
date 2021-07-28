class Node {
  constructor(data) {
    this.data = data;
    this.prev = null;
    this.next = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.length++;
    return this;
  }

  delete(index) {
    let removedNode;
    if (index >= this.length) {
      return false;
    }
    if (index == 0) {
      removedNode = this.shift();
    } else if (index == this.length - 1) {
      removedNode = this.pop();
    } else {
      removedNode = this.find(index);
      const after = removedNode.next;
      const before = removedNode.prev;
      removedNode.next = null;
      removedNode.prev = null;
      before.next = after;
      after.prev = before;
      this.length--;
    }
    return removedNode;
  }

  find(index) {
    if (index >= this.length || index < 0) {
      return false;
    }
    let currentIndex = 0;
    let currentNode = this.head;
    while (currentIndex !== index) {
      currentNode = currentNode.next;
      currentIndex++;
    }
    return currentNode;
  }

  pop() {
    if (this.length === 0) {
      return false;
    }
    const popped = this.tail;
    const newTail = this.tail.prev;
    if (newTail) {
      newTail.next = null;
      this.tail.prev = null;
    } else {
      this.head = null;
    }
    this.tail = newTail;
    this.length--;

    return popped;
  }

  shift() {
    if (!this.head) {
      return false;
    }
    const shiftedNode = this.head;
    const newHead = this.head.next;
    if (this.head !== this.tail) {
      newHead.prev = null;
      shiftedNode.next = null;
    } else {
      this.tail = null;
    }
    this.head = newHead;
    this.length--;
    return shiftedNode;
  }

  scan(process) {
    if (this.head) {
      let index = 0;
      let current = this.head;
      while (index < this.length) {
        process(current.data, index);
        current = current.next;
        index++;
      }
    }
  }
}

module.exports = DoublyLinkedList;
