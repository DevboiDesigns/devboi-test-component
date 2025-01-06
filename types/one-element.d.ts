import { LitElement } from "lit";
import "./test-view-wrapper.js";
declare class OneElement extends LitElement {
    oneName: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "one-element": OneElement;
    }
}
export {};
