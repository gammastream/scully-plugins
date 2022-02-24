# scully-plugin-emoji

The `scully-plugin-emoji` is a `postProcessByHtml` plugin for [Scully](http://scully.io/) that convert the emoji syntax of Github to Emoji Syntax.
It only converts content in the tag `<p>` of `Html`:

>Don't overestimate me! I don't remember and know all these **:grinning:**

Will convert to

>Don't overestimate me! I don't remember and know all these 😀

## 📦 Installation

To install this plugin with `npm` run

```
$ npm install scully-plugin-emoji --save-dev
```

peerDependencies is required:

```
$ npm install @types/jsdom --save-dev
```

## Usage

Add plugin to `scully.*.config.ts` config

```typescript
import { getEmojiPlugin } from "@nhvu95/scully-plugin-emoji";
const EmojiPlugin = getEmojiPlugin();

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
            postRenderers: [EmojiPlugin],
        },
    },
};

```

You also can custom your icon sets and regex to detect icons by using `setPluginConfig` and by using a config object like the below interface. If you don't config your icons set, the default icon set will be used.

```typescript
export interface EmojiPluginConfig {
  emojiList?: Record<string, string>;
  regex?: RegExp;
}
```

For example in `scully.*.config.ts`:

```typescript
import { setPluginConfig } from "@scullyio/scully";

setPluginConfig(EmojiPlugin, {
    emojiList: {grinning: `=]]~`}
});
```
