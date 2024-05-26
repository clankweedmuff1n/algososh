export default class Queue<T> {
    private readonly size: number = 0;
    private readonly items: Array<T | undefined> = [];

    constructor(size: number) {
        this.size = size;
        this.items = Array(this.size);
    }

    enqueue(item: T): void {
        for (let i = 0; i < this.getSize(); i++) {
            if (this.items[i] === undefined) {
                this.items[i] = item;

                break;
            }
        }
    }

    dequeue(): T | undefined {
        let result = undefined;

        for (let i = 0; i < this.getSize(); i++) {
            if (this.items[i] !== undefined) {
                result = this.items[i];
                this.items[i] = undefined;
                break;
            }
        }

        return result;
    }

    peekIndex(): number | undefined {
        let result = undefined;
        for (let i = 0; i < this.getSize(); i++) {
            if (this.items[i] !== undefined) {
                result = i;
                break;
            }
        }
        return result;
    }

    tailIndex(): number | undefined {
        let result = undefined;
        for (let i = 0; i < this.getSize(); i++) {
            if (this.items[i] !== undefined) {
                result = i;
            }
        }
        return result;
    }

    getSize(): number {
        return this.items.length;
    }

    clear(): void {
        for (let i = 0; i < this.getSize(); i++) this.items[i] = undefined;
    }

    getQueue(): Array<T | undefined> {
        return this.items;
    }
}