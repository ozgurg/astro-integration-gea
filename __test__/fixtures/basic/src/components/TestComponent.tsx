import { Component } from "@geajs/core";

export default class TestComponent extends Component {
    template(props: { title: string }) {
        return (
            <div id="test-root">
                <h1>{props.title}</h1>
                <slot />
                <div class="footer">
                    <slot name="footer" />
                </div>
            </div>
        );
    }
}
