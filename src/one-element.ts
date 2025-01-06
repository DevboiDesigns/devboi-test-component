import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"

@customElement("one-element")
class OneElement extends LitElement {
  @property({ type: String }) oneName = "Default Company Name"

  render() {
    return html`<pre>${this.oneName}</pre>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "one-element": OneElement
  }
}
