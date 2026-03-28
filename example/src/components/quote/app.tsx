import { Component } from "@geajs/core";
import "./style.css";

type Props = {
    initialQuote: string;
    initialAuthor: string;
};

export default class QuoteApp extends Component {
    template(props: Props) {
        return (
            <div class="card quote-card">
                <h2>
                    Server Props &amp; Slots
                    <span class="badge badge--amber">client:visible + slot + named slot</span>
                </h2>
                <blockquote class="quote-content">
                    "{props.initialQuote}"
                </blockquote>
                <p class="quote-author">
                    — {props.initialAuthor}
                </p>
                <slot />
                <div class="quote-footer">
                    <slot name="footer" />
                </div>
            </div>
        );
    }
}
