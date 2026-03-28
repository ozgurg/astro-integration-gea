import { Component } from "@geajs/core";
import globalStore from "./store.js";
import "./style.css";

export default class GlobalApp extends Component {
    template() {
        return (
            <div class="card global-card">
                <div>
                    <h2>
                        Global State <span class="badge">Cross-component</span>
                    </h2>
                    <p>
                        Fills Counter &amp; Todo from a shared store.
                    </p>
                </div>
                <button
                    class="btn global-btn"
                    click={() => globalStore.applySampleData()}>
                    Load Sample Data
                </button>
            </div>
        );
    }
}
