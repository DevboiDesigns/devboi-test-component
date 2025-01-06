import { createApp } from "vue";
import TestView from "./TestView.vue";

class TestViewWrapper extends HTMLElement {
  connectedCallback() {
    createApp(TestView).mount(this);
  }
}

customElements.define("test-view-wrapper", TestViewWrapper);