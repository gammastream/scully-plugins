# scully-plugin-scroll2section

The `scully-plugin-scroll2section` is a `postProcessByHtml` plugin for [Scully](http://scully.io/) that help `<a>` tag can route and scroll to a section in current static site.

For example:
* 📦 Usage(#usage)

This plugin helps `usage` above scroll to the `## Usage` bellow


## 📦 Installation

To install this plugin with `npm` run

```
$ npm install @nhvu95/scully-plugin-scroll2section --save-dev
```

peerDependencies is required:

```
$ npm install @types/jsdom --save-dev
```

## Usage

Add plugin to `scully.*.config.ts` config

```typescript
import { ScrollToSection } from "@nhvu95/scully-plugin-scroll2section";

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
            postRenderers: [ScrollToSection],
        },
    },
};

```
