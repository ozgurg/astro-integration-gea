# Astro + Gea Example

This is a comprehensive demo of the [Astro + Gea integration](..).

> [!NOTE]  
> This project demonstrates experimental features. APIs are in beta.

It showcases:

- **Interactive Components:** Counter with fine-grained reactivity.
- **Form Handling:** Todo list with automatic data binding.
- **Local vs Global State:** components sharing data via Gea stores.
- **Astro Features:**
    - **Server Props:** Data passed from an Astro frontmatter to a Gea component.
    - **Native Multi-slotting:** Using `<slot />` and `<slot name="footer" />`.
    - **Hydration Strategies:** `client:load`, `client:visible`, and static rendering.
    - **Modern UI:** Responsive grid, Inter typography, and sleek card design.

## How to Run

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:4321/`

## Project Structure

- `src/pages/index.astro`: The main page assemblying all the pieces.
- `src/components/`: Sub-folders for each widget, containing:
    - `app.tsx`: The Gea component definition.
    - `style.css`: Component-scoped styles.
    - `store.ts`: (Optional) Reactive Gea stores for state sharing.
- `src/layouts/`: Common layout component.

## Key Snippets

### Using Named Slots in Astro

```astro
<QuoteApp client:visible initialQuote={...} initialAuthor={...}>
    <div class="slot-content slot-default">
        This goes to <slot /> tag.
    </div>
    <div slot="footer" class="slot-content slot-footer">
        This goes to <slot name="footer" /> tag.
    </div>
</QuoteApp>
```
