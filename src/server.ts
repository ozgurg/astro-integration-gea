import { parseHTML } from "linkedom";

export default {
    // Check if a component is a Gea
    check(Component: any, props: any, slotted: any) {
        if (typeof Component !== "function") {
            return false;
        }
        // Assume Gea if it has a template prototype method
        return Component.prototype && typeof Component.prototype.template === "function";
    },

    // Render the component to static markup
    async renderToStaticMarkup(Component: any, props: any, slotted: any, metadata: any) {
        const {
            document,
            window,
            HTMLElement,
            Node,
            customElements,
            Event,
            EventTarget,
            Selection,
            MutationObserver
        } = parseHTML(`<!DOCTYPE html><html><head></head><body><div id="gea-root"></div></body></html>`);

        // Temporarily polyfill DOM globally
        const oldDocument = global.document;
        const oldWindow = global.window;
        const oldHtmlElement = global.HTMLElement;
        const oldNode = global.Node;
        const oldCustomElements = global.customElements;
        const oldEvent = global.Event;
        const oldEventTarget = global.EventTarget;
        const oldSelection = global.Selection;
        const oldMutationObserver = global.MutationObserver;
        const oldRequestAnimationFrame = global.requestAnimationFrame;

        global.document = document;
        global.window = window;
        global.HTMLElement = HTMLElement;
        global.Node = Node;
        global.customElements = customElements;
        global.Event = Event;
        global.EventTarget = EventTarget;
        global.Selection = Selection;
        global.MutationObserver = MutationObserver;
        // @ts-ignore
        global.requestAnimationFrame = (callback: any) => setTimeout(callback, 0);

        try {
            const app = new Component(props);
            const root = document.getElementById("gea-root");
            if (root) {
                app.render(root);

                // After render, find `<slot />` elements and inject Astro slot content
                if (slotted) {
                    for (const [name, html] of Object.entries(slotted)) {
                        const slotName = name === "default" ? "default" : name;
                        // Match `<slot />` for default, `<slot name="named-slot" />` for named
                        const selector = slotName === "default"
                            ? "slot:not([name]), slot[name='default']"
                            : `slot[name='${slotName}']`;
                        const slotEl = root.querySelector(selector);
                        if (slotEl) {
                            // Replace `<slot />` with an `<astro-slot />` wrapper containing the content
                            const wrapper = document.createElement("astro-slot");
                            if (slotName !== "default") {
                                wrapper.setAttribute("name", slotName);
                            }
                            wrapper.innerHTML = html as string;
                            slotEl.replaceWith(wrapper);
                        }
                    }
                }

                const html = root.innerHTML;
                return {
                    html
                };
            }
            return {
                html: ""
            };
        } finally {
            // Restore global space
            global.document = oldDocument;
            global.window = oldWindow;
            global.HTMLElement = oldHtmlElement;
            global.Node = oldNode;
            global.customElements = oldCustomElements;
            global.Event = oldEvent;
            global.EventTarget = oldEventTarget;
            global.Selection = oldSelection;
            global.MutationObserver = oldMutationObserver;
            global.requestAnimationFrame = oldRequestAnimationFrame;
        }
    }
};
