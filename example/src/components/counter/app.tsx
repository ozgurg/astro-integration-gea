import { Component } from "@geajs/core";
import store from "./store.js";
import "./style.css";

export default class CounterApp extends Component {
    template() {
        return (
            <div class="card">
                <h2>Counter <span class="badge">Store</span></h2>
                <div class="counter-body">
                    <button
                        class="btn"
                        click={store.decrement}>
                        −
                    </button>
                    <span class="counter-value">
                        {store.count}
                    </span>
                    <button
                        class="btn"
                        click={store.increment}>
                        +
                    </button>
                </div>
            </div>
        );
    }
}
