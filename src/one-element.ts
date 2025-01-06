import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import "./test-view-wrapper.js"

@customElement("one-element")
class OneElement extends LitElement {
  @property({ type: String }) oneName = "Default Company Name"

  render() {
    return html`<test-view-wrapper>${this.oneName}</test-view-wrapper>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "one-element": OneElement
  }
}
