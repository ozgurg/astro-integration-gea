export default (element: HTMLElement) => async (
    Component: any,
    props: Record<string, any>,
    slotted: any,
    { client }: { client: string }
) => {
    if (!element.hasAttribute("ssr")) {
        return;
    }

    // Extract `<astro-slot />` elements from the server-rendered DOM before hydration
    const astroSlots = element.querySelectorAll("astro-slot");
    const slotMap = new Map<string, DocumentFragment>();

    for (const astroSlot of astroSlots) {
        const name = astroSlot.getAttribute("name") || "default";
        const fragment = document.createDocumentFragment();
        while (astroSlot.firstChild) {
            fragment.appendChild(astroSlot.firstChild);
        }
        slotMap.set(name, fragment);
    }

    // Clear the element for Gea to render fresh
    element.innerHTML = "";

    // Render the Gea component
    const app = new Component(props);
    app.render(element);

    // After Gea renders, find `<slot />` elements and inject preserved content
    if (slotMap.size > 0) {
        for (const [name, fragment] of slotMap) {
            const selector = name === "default"
                ? "slot:not([name]), slot[name='default']"
                : `slot[name='${name}']`;
            const slotElement = element.querySelector(selector);
            if (slotElement) {
                slotElement.replaceWith(fragment);
            }
        }
    }
};
