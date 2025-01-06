import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"

@customElement("two-element")
class TwoElement extends LitElement {
  @property({ type: String }) twoName = "Default Company Name"

  render() {
    return html`<pre>${this.twoName}</pre>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "two-element": TwoElement
  }
}
