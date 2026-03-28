import { Store } from "@geajs/core";
import counterStore from "../counter/store.js";
import todoStore from "../todo/store.js";

class GlobalStore extends Store {
    applySampleData() {
        // Update Counter
        counterStore.count = 26;

        // Update Todos
        todoStore.todos = [
            { id: Date.now(), text: "Learn Gea Reactivity", done: true },
            { id: Date.now() + 1, text: "Build a Global Controller", done: true },
            { id: Date.now() + 2, text: "Ship fast with Astro", done: false }
        ];
    }
}

export default new GlobalStore();
