interface Props {
    draft: string;
    onInput: (e: Event) => void;
    onAdd: () => void;
}

export default function TodoInput({ draft, onInput, onAdd }: Props) {
    return (
        <div class="input-row">
            <input
                type="text"
                value={draft}
                input={onInput}
                keydown={(event: KeyboardEvent) => event.key === "Enter" && onAdd()}
                placeholder="What needs to be done?" />
            {draft && (
                <button
                    class="btn"
                    click={onAdd}>
                    Add
                </button>
            )}
        </div>
    );
}
