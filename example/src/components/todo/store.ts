import { Store } from "@geajs/core";

export interface Todo {
    id: number;
    text: string;
    done: boolean;
}

class TodoStore extends Store {
    todos: Todo[] = [];
    draft: string = "";
    activeCount: number = 0;
    completedCount: number = 0;

    constructor() {
        super();
        // Reactive core: class fields become reactive properties automatically.
        // We observe `todos` to keep `activeCount` and `completedCount` in sync.
        this.observe("todos", () => {
            this.activeCount = this.todos.filter(todo => !todo.done).length;
            this.completedCount = this.todos.filter(todo => todo.done).length;
        });
    }

    setDraft(event: Event) {
        this.draft = (event.target as HTMLInputElement).value;
    }

    add() {
        const text = this.draft.trim();
        if (!text) {
            return;
        }
        this.todos.push({ id: Date.now(), text, done: false });
        this.draft = "";
    }

    toggle(id: number) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.done = !todo.done;
        }
    }

    remove(id: number) {
        this.todos = this.todos.filter(todo => todo.id !== id);
    }

    /*
    // NOTE: Gea reactivity model: "class fields become reactive properties automatically. Methods and getters on the prototype are not reactive."
    // These are converted to reactive class fields in the constructor above.

    get activeCount(): number {
        return this.todos.filter(todo => !todo.done).length;
    }

    get completedCount(): number {
        return this.todos.filter(todo => todo.done).length;
    }
    */
}

export default new TodoStore();
