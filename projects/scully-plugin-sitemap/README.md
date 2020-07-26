# scully-plugin-sitemap

This `routeDiscoveryDone` plugin for [Scully](http://scully.io/) that will generate one or more sitemaps for your generated routes.

*Version 1.0.0 introduces breaking changes as the plugin has been rewritten to take advantage of the new `routeDiscoveryDone` plugin type rather the old way of using a `render` plugin.  This has the major benefit of only generating the sitemaps once per run – instead of after each page render.*

## Installation

To install this library with `npm` run

```
$ npm install @gammastream/scully-plugin-sitemap --save-dev
```

## Dependencies

The following peer dependencies are must be installed separately.  Most are installed when install Angular or Scully.  You'll likely only need to worry about `fast-xml-parser` and `xmlbuilder`.

```json
  "peerDependencies": {
    "@scullyio/scully": "0.0.99",
    "@types/node": "^7.10.10",
    "fast-xml-parser": "^3.17.4",
    "path-to-regexp": "^0.1.7",
    "xmlbuilder": "^13.0.2"
  },	
```

## Usage

Within your Scully config (typescript), get and configure the plugin like so:

```typescript
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { getSitemapPlugin } from '@gammastream/scully-plugin-sitemap';


const SitemapPlugin = getSitemapPlugin();
setPluginConfig(SitemapPlugin, {
    urlPrefix: 'https://gamma.stream',
    sitemapFilename: 'sitemap.xml',
    merge: false,
    trailingSlash: false,
    changeFreq: 'monthly',
    priority: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'],
    ignoredRoutes: ['/404'],
    routes: {
        '/products/:productId': {
            changeFreq: 'daily',
            priority: '0.9',
            sitemapFilename: 'sitemap-products.xml',
            merge: true
        },
    }
});

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'scully-plugins',
  outDir: './dist/static',
  routes: {
    '/products/:productId': {
        type: 'json',
        productId: {
            url: 'http://localhost:4200/assets/products.json',
            property: 'id',
        }
    }
  }
};

```

Build app and run scully like normal.

```shell script
npm run build
npm run scully
```



## Configuring Priority

The priority of a route can be configured by setting the priority level based on the number of segments in a given route.

```javascript
[
	'1.0', // `/` - [ '' ] (1 segment)
	'0.9', // `/services` - [ '', 'services' ] (2 segments)
	'0.8', // `/services/hosting` - [ '', 'services', 'hosting' ]
	// etc...
]
```

## Partial Generation with --routeFilter

Version 1.0.1 adds the `merge` flag.  Setting the flag to true causes the generated routes to be merged into the existing sitemap file (if there is one).  This allows users to generate a subset of routes without overwriting previously generated routes within the sitemap.

```javascript
	// excerpt
    routes: {
        '/products/:productId': {
            changeFreq: 'daily',
            priority: '0.9',
            sitemapFilename: 'sitemap-products.xml',
            merge: true
        },
    }
```

## SEO Optimization & Trailing Slash

Version 1.0.2 adds the `trailingSlash` flag.  Setting the flag to true causes the url to be suffixed with a `/`.  This is useful for SEO.  You can set it for the main config or for individual routes.

```javascript
const SitemapPlugin = getSitemapPlugin();
setPluginConfig(SitemapPlugin, {
    urlPrefix: 'https://gamma.stream',
    sitemapFilename: 'sitemap.xml',
    merge: false,
    trailingSlash: true,
});
```

## Notes

* ~~Currently, the default priority (0.5) is assigned to all routes.  Planned for a future update is the ability to assign a priority based on the number of segments in a route.~~ (Completed in v0.0.4)

* ~~Sitemap is regenerated with every route.  At some time in the future, we expect Scully to support a class of plugins that run after it is finished generating all the routes.~~ (Completed in v1.0.0)

## Questions or Issues

If you have any issues you can raise them here or contact me at: [GammaStream](https://gamma.stream)
