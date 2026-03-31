# Astro + Gea

A powerful, minimal, and compiled-reactivity integration for Astro.  
Build fast apps with Astro's Islands architecture and Gea's lightning-fast reactive model.

> [!WARNING]
> **Status: Beta**  
> This integration is currently in **beta**. It is **not production-ready** and has **not been battle-tested** in
> large-scale applications. APIs may change before the 1.0 release. Use with caution in critical projects.

## Features

- **🚀 Island Architecture:** Full support for Astro's hydration directives (e.g., `client:load`, `client:visible`).
- **⚡ Compiled Reactivity:** Powered by `@geajs/vite-plugin` for fine-grained updates without a heavy virtual DOM.
- **🧩 Native Slot Support:** Use standard `<slot />` and `<slot name="footer" />` tags directly in your Gea components.
- **🌏 Global State:** Seamlessly share reactive stores between components using standard Gea patterns.
- **🛠️ Minimalist API:** High-performance UI without the boilerplate.

## Compatibility

This integration is tested and fully compatible with:

- **Astro:** `^4.0.0` | `^5.0.0` | `^6.0.0`
- **Gea** `^1.0.0`
- **Node.js:** `>=22.0.0`

## Installation

```bash
npm install astro-integration-gea @geajs/core @geajs/vite-plugin
```

## Configuration

Add the integration and the Gea Vite plugin to your `astro.config.mjs`:

```javascript
import { defineConfig } from "astro/config";
import geaIntegration from "astro-integration-gea";

export default defineConfig({
    integrations: [
        geaIntegration()
    ]
});
```

The integration automatically configures both the server-side renderer and the client-side hydrator.

## Usage

### 1. Create a Gea Component

Create your component as a `.tsx` (or `.jsx`) file:

```tsx
import { Component } from "@geajs/core";

export default class MyComponent extends Component {
    declare props: { title: string };

    template(props: this["props"]) {
        return (
            <div class="card">
                <h2>{props.title}</h2>
                <slot />
                <div class="footer">
                    <slot name="footer" />
                </div>
            </div>
        );
    }
}
```

### 2. Use in Astro Page

Import and use your component with any Astro hydration directive:

```astro
---
import MyComponent from "../components/MyComponent.jsx";
---

<MyComponent client:visible title="Hello From Astro!">
  <p>This goes into the default slot!</p>
  <div slot="footer">
      This goes into the named 'footer' slot.
  </div>
</MyComponent>
```

## How It Works

- **SSR:** The integration uses `linkedom` as a lightweight DOM on the server to render Gea components to static HTML.
- **Hydration:** On the client, the integration preserves your slot content from the server rendered HTML, hydrates the
  Gea component, and seamlessly restores the slots exactly where you placed your `<slot />` tags.
- **Reactivity:** Data binding is compiled at build-time by the Gea Vite plugin, ensuring only the exact DOM nodes that
  need updating are touched when state changes.

## Development

To run the provided example project:

```bash
cd example
npm install
npm run dev
```

## Known Issues

- **Prototype Getters in Stores:** In Gea `Store` classes, methods and getters defined on the prototype are **not
  reactive**. Only class fields are automatically converted into reactive properties. If you need a reactive derived
  value, use a class field and keep it updated (e.g., by using `this.observe` in the constructor).

## License

![GitHub License](https://img.shields.io/github/license/ozgurg/astro-integration-gea)
