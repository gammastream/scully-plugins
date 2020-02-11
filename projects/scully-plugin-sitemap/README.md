# scully-plugin-sitemap

This `postRenderer` plugin for [Scully](http://scully.io/) that will generate a sitemap.xml for the generated routes.

## Installation

To install this library with `npm` run

```
$ npm install @gammastream/scully-plugin-sitemap --save-dev
```

## Usage

Add the plugin to the `defaultPostRenderers` to execute it on all rendered pages:

```js
const {RouteTypes} = require('@scullyio/scully');
const {Sitemap} = require('@gammastream/scully-plugin-sitemap');

const defaultPostRenderers = [Sitemap];

const sitmapOptions = {
};


exports.config = {
  projectRoot: './src/app',
  sitmapOptions,
  defaultPostRenderers,
  routes: {}
};
```

Build app and run scully like normal.

```shell script
npm run build
npm run scully
```

## Questions or Issues

If you have any issues you can raise them here or contact me at: [GammaStream](https://gamma.stream)
