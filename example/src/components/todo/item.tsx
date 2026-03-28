import type { Todo } from "./store.js";

interface Props {
    todo: Todo;
    onToggle: () => void;
    onRemove: () => void;
}

export default function TodoItem({ todo, onToggle, onRemove }: Props) {
    return (
        <li class={todo.done ? "done" : ""}>
            <input
                type="checkbox"
                checked={todo.done}
                change={onToggle} />
            <span>
                {todo.text}
            </span>
            <button
                class="remove"
                click={onRemove}>
                Remove
            </button>
        </li>
    );
}
