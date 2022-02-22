# scully-plugin-sitemap

This `routeDiscoveryDone` plugin for [Scully](http://scully.io/) that will generate one or more sitemaps for your generated routes.

## Installation

To install this library with `npm` run

```
$ npm install @recursyve/scully-sitemap --save-dev
```

## Dependencies

The following peer dependencies are must be installed separately.  Most are installed when install Angular or Scully.  You'll likely only need to worry about `fast-xml-parser` and `xmlbuilder`.

```json
  "peerDependencies": {
  "@scullyio/scully": "^2.1.14",
  "fast-xml-parser": "^4.0.3",
  "path-to-regexp": "^6.2.0",
  "xmlbuilder": "^15.1.1"
  },	
```

## Usage

Within your Scully config (typescript), get and configure the plugin like so:

```typescript
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { getSitemapPlugin } from '@gammastream/scully-sitemap';


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

Setting the `merge` flag to true causes the generated routes to be merged into the existing sitemap file (if there is one).  This allows users to generate a subset of routes without overwriting previously generated routes within the sitemap.

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

Setting the `trailingSlash` flag to true causes the url to be suffixed with a `/`.  This is useful for SEO.  You can set it for the main config or for individual routes.

```javascript
const SitemapPlugin = getSitemapPlugin();
setPluginConfig(SitemapPlugin, {
    urlPrefix: 'https://your.site',
    sitemapFilename: 'sitemap.xml',
    merge: false,
    trailingSlash: true,
});
```
