import { LitElement } from "lit";
declare class TwoElement extends LitElement {
    twoName: string;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "two-element": TwoElement;
    }
}
export {};
