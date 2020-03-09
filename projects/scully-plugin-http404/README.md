# scully-plugin-http404

This `postRenderer` plugin for [Scully](http://scully.io/) will create a `/404.html` page for the configured `/404` route.  This is handy for generating custom 404 error pages within your Angular application while maintaining compatibility with the [firebase hosting requirements](https://firebase.google.com/docs/hosting/full-config#404) for 404s.

## Installation

To install this library with `npm` run

```
$ npm install @gammastream/scully-plugin-http404 --save-dev
```

## Usage

Create a 404 route in the root router:

```typescript
RouterModule.forRoot([{
      path: 'a',
      component: PageComponent
    }, {
      path: 'b',
      component: PageComponent
    }, {
      path: 'c',
      component: PageComponent
    }, {
      path: '',
      component: PageComponent
    }, {
      path: '404',
      component: Http404Component
    }, {
      path: '**',
      component: Http404Component
    }])
```

Add the plugin to the `defaultPostRenderers` to execute it on the /404 route:

```js
const {RouteTypes} = require('@scullyio/scully');
const {Http404} = require('@gammastream/scully-plugin-http404');

const defaultPostRenderers = [Http404];

exports.config = {
  projectRoot: './src/app',
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
