export default class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    getSize(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }

    getStack(): T[] {
        return this.items;
    }
}