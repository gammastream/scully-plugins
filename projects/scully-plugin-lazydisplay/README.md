# scully-plugin-lazydisplay

The `scully-plugin-lazydisplay` is a `postProcessByHtml` plugin for [Scully](http://scully.io/) that help scully display only the items on screen, the others will be hidden.

For example:
* 📦 Usage(#usage)

This plugin helps `usage` above scroll to the `## Usage` bellow


## 📦 Installation

To install this plugin with `npm` run

```
$ npm install @nhvu95/scully-plugin-lazydisplay --save-dev
```

peerDependencies is required:

```
$ npm install @types/jsdom --save-dev
```

## Usage

Add plugin to `scully.*.config.ts` config

```typescript
import { getLazyDisplay } from "@nhvu95/scully-plugin-lazydisplay";

const LazyDisplay = getLazyDisplay();

export const config: ScullyConfig = {
    projectRoot: "./src",
    projectName: "portfolio",
    distFolder: "./dist/portfolio/browser",
    outDir: "./dist/static",
    routes: {
        "/blog/:slug": {
            type: "contentFolder",
            slug: {
                folder: "./blog",
            },
            postRenderers: [LazyDisplay],
        },
    },
};

```

Add `id="scully-content"` to <scully-content> parent

```html
<div class="s-content" id="scully-content">
    <scully-content></scully-content>
</div>
```
