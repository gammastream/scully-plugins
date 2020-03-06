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

const sitemapOptions = {
  urlPrefix: 'https://gamma.stream',
  sitemapFilename: 'sitemap.xml',
  changeFreq: 'monthly'
};


exports.config = {
  projectRoot: './src/app',
  sitemapOptions,
  defaultPostRenderers,
  routes: {}
};
```

Build app and run scully like normal.

```shell script
npm run build
npm run scully
```

## Notes

* Currently, the default priority (0.5) is assigned to all routes.  Planned for a future update is the ability to assign a priority based on the number of segments in a route.

* Sitemap is regenerated with every route.  At some time in the future, we expect Scully to support a class of plugins that run after it is finished generating all the routes.

## Questions or Issues

If you have any issues you can raise them here or contact me at: [GammaStream](https://gamma.stream)
