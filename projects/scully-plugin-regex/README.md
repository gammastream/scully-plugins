# scully-plugin-regex

This `postRenderer` plugin for [Scully](http://scully.io/) will apply the configured regex replacements to your Scully rendered HTML.

## Installation

To install this library with `npm` run

```
$ npm install @gammastream/scully-plugin-regex --save-dev
```

## Usage

Add the plugin to the `defaultPostRenderers` to execute it on all rendered pages:

```js
const {RouteTypes} = require('@scullyio/scully');
const {RegexHtml} = require('@gammastream/scully-plugin-regex');

const defaultPostRenderers = [RegexHtml];

const regexOptions = {
    replacements: [{
        from: 'http://www.googletagmanager.com',
        to: 'https://www.googletagmanager.com'
    }, {
        from: 'foo',
        to: 'bar'
    }, {
        from: new RegExp('([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)', 'gi'),
        to: '<a href="mailto:$1">$1</a>'
    }]
};


exports.config = {
  projectRoot: './src/app',
  regexOptions,
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
