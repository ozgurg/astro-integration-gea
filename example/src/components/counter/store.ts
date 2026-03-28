import { Store } from "@geajs/core";

class CounterStore extends Store {
    count: number = 10;

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }
}

export default new CounterStore();
