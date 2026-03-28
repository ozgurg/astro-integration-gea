import { Component } from "@geajs/core";
import store from "./store.js";
import "./style.css";
import TodoInput from "./input.jsx";
import TodoItem from "./item.jsx";

export default class TodoApp extends Component {
    template() {
        return (
            <div class="card todo-app">
                <h2>Todos <span class="badge">Store + Components</span></h2>
                <TodoInput
                    draft={store.draft}
                    onInput={store.setDraft}
                    onAdd={() => store.add()} />
                <ul class="todo-list">
                    {store.todos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={() => store.toggle(todo.id)}
                            onRemove={() => store.remove(todo.id)} />
                    ))}
                </ul>
                <p class="count">
                    {store.activeCount} active / {store.completedCount} completed
                </p>
            </div>
        );
    }
}
