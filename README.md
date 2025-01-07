# Lit & Vite Web Component

Example Repository to document how to create and publish web components with vite & lit.

- [Lit](https://lit.dev)
- [Vite](https://vite.dev)

Create a Vite & Lit web component and publish to NPM and consume in a new project.

- [Bundle Vite in library mode notes](https://vite.dev/guide/build.html#library-mode)
- [Helpful Stackoverflow](https://stackoverflow.com/questions/78195144/bundling-lit-js-in-vite-for-production-rolluperror-could-not-resolve-entry-mo)
- [Lit Publish Docs](https://lit.dev/docs/v1/tools/publish/)

# Create Web Component

Example setup for a package named **`devboi-test-component`**. Be sure to replace all instances of this name with your own package name.

- [Publishing Lit & Vite notes (with storybook)](https://dev.to/leon/vite-lit-and-storybook-43f)

1. **Create package**:

```sh
npm create vite@latest devboi-test-component -- --template lit-ts
```

2. **Delete assets, public dist, sample element, and remove favicon from `index.html`.**

3. **Create vite.config.js**:

_Depending on your project `externalize deps that shouldn't be bundled`_

```js
import { resolve } from "path"
import { defineConfig } from "vite"

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "NewCmp",
      // the proper extensions will be added
      fileName: "devboi-test-component",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
       external: ["lit"],
    },
  },
})
```

4. **Create some test components to export in the src dir**:

- `one-element.ts`

```ts
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
```

- `two-element.ts`

```ts
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
```

5. **Create a barrel file entry point in the src dir and export all components**:

- `src/index.ts`

```ts
export * from "./one-element"
export * from "./two-element"
```

6. **Update `tsconfig.json`**:

```json
{
  "compilerOptions": {
    "target": "es2017",
    "module": "es2015",
    "moduleResolution": "node",
    "lib": ["es2017", "dom"],
    "experimentalDecorators": true,
    "declaration": true,
    "emitDeclarationOnly": true,
    "outDir": "./types",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "useDefineForClassFields": false
  },
  "include": ["src/**/*.ts"]
}
```

7. **Setup `index.html` and test new components with `npm run dev`**:

_Make sure to import the new `src/index.ts` export file._

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Test Component</title>
    <link rel="stylesheet" href="./src/index.css" />
    <script type="module" src="/src/index.ts"></script>
  </head>
  <body>
    <one-element oneName="One-Name"></one-element>
    <two-element twoName="TwoName"></two-element>
  </body>
</html>
```

8. **Setup `package.json`**:

Remove `private`

Add:

- name of package
- type
- files
- main
- module
- exports
- repository

```json
{
  "name": "devboi-test-component",
  "version": "0.0.1",
  "type": "module",
  "files": ["dist", "types"],
  "main": "./dist/devboi-test-component.umd.cjs",
  "module": "./dist/devboi-test-component.js",
  "exports": {
    ".": {
      "import": "./dist/devboi-test-component.js",
      "require": "./dist/devboi-test-component.umd.cjs"
    }
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/DevboiDesigns/devboi-test-component"
  },
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "peerDependencies": {
    "lit": "^3.2.1"
  },
  "devDependencies": {
    "typescript": "~5.6.2",
    "vite": "^6.0.5"
  }
}
```

# Publish

- [Notes on publishing](https://www.freecodecamp.org/news/how-to-create-and-publish-your-first-npm-package/)

```sh
npm publish --access public
```

# Testing in a new project

Create a new empty directory with an `index.html` file and add the below code. You should see the components in the browser.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script
      type="module"
      src="https://cdn.skypack.dev/devboi-test-component"
    ></script>
    <title>Test Component</title>
    <style>
      * {
        background-color: black;
        color: white;
      }
    </style>
  </head>
  <body>
    <one-element oneName="Test&nbsp;Name"></one-element>
    <fake-element fakeName="FakeName"></fake-element>
    <two-element twoName="Two&nbsp;Name"></two-element>
  </body>
</html>
```

# Optional

Setup using [Vue](https://vuejs.org) files in the project:

Install:

```sh
npm i -D @vitejs/plugin-vue
```

1. Create a test `Vue` file in the src dir and with the contents:

- `TestView.vue`

```vue
<script setup></script>
<template>
  <div>
    <h1>Test View</h1>
  </div>
</template>
```

2. Create a `test-view-wrapper.js` in the src dir with the contents:

- `test-view-wrapper.js`

```js
import { createApp } from "vue"
import TestView from "./TestView.vue"

class TestViewWrapper extends HTMLElement {
  connectedCallback() {
    createApp(TestView).mount(this)
  }
}

customElements.define("test-view-wrapper", TestViewWrapper)
```

3. Use the custom element in your LitElement:

```ts
import { LitElement, html } from "lit"
import { customElement, property } from "lit/decorators.js"
import "./test-view-wrapper.js"

@customElement("one-element")
class OneElement extends LitElement {
  @property({ type: String }) oneName = "Default Company Name"

  render() {
    return html`<test-view-wrapper></test-view-wrapper>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "one-element": OneElement
  }
}
```

4. Configure the `Vue` plugin:

- `vite.config.js`

```js
// filepath: /Users/devboi/GitHub/devboi-test-component/vite.config.js
import { resolve } from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/index.ts"),
      name: "NewCmp",
      // the proper extensions will be added
      fileName: "devboi-test-component",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["lit", "vue"],
    },
  },
})
```

5. Test

```sh
npm run dev
```

# Notes

Interesting helpful links:

- [Medium Article - create-web-components-using-google-lit](https://biondifabio.medium.com/create-web-components-using-google-lit-71099093b8fc)
- [YT Video by same person as above on publishing](https://www.youtube.com/watch?v=hrhWXSZ7M3w)

## Star on GitHub 🤩

If you found this example to be helpful
[star this project on GitHub](https://github.com/DevboiDesigns/devboi-test-component#start-of-content).

[![GitHub stars](https://img.shields.io/github/stars/devboidesigns/devboi-test-component?style=social)](https://github.com/devboidesigns/devboi-test-component#start-of-content)

---

[Source code](https://github.com/DevboiDesigns/devboi-test-component)

[License](https://github.com/DevboiDesigns/devboi-test-component/blob/main/LICENSE)
