import { Component } from "@geajs/core";
import "./style.css";

export default class GreetingApp extends Component {
    name: string = "Stranger";

    updateName(event: Event) {
        this.name = (event.target as HTMLInputElement).value;
    }

    template() {
        return (
            <div class="card greeting-app">
                <h2>Greeting <span class="badge">Local State</span></h2>
                <div class="greeting-body">
                    <p>Hello, <span class="highlight">{this.name || "World"}</span>!</p>
                    <input
                        type="text"
                        value={this.name}
                        input={(e) => this.updateName(e)}
                        placeholder="Type your name…"
                        class="greeting-input" />
                </div>
            </div>
        );
    }
}
