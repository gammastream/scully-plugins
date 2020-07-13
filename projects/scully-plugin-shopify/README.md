# scully-plugin-shopify

This `route` plugin for [Scully](http://scully.io/) fetches collection and product ids/handles from Shopify for pre-rendering routes within an Angular application.  It includes two plugins, one for fetch collections and another for fetching products.

## Installation

To install this library with `npm` run:

```
$ npm install @gammastream/scully-plugin-shopify --save-dev
```

## Usage

* Create a `.env` file in the root of your project. (Make sure this is ignored by git)
* Include your Shopify domain and access token.

```
SHOPIFY_DOMAIN=xample-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=djskjck3jskjdkjskjdkjf
```
	
* Import and configure the plugin as required. (See example below)
* Refer to the [Shopify Buy SDK](https://shopify.github.io/js-buy-sdk) for query options.


```typescript
import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { getShopifyCollectionsPlugin , getShopifyProductsPlugin} from './dist/scully-plugin-shopify';
import * as dotenv from 'dotenv';
dotenv.config();

const shopifyConfig = {
    domain: process.env.SHOPIFY_DOMAIN,
    storefrontAccessToken: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN
};
const ShopifyCollectionsPlugin = getShopifyCollectionsPlugin();
setPluginConfig(ShopifyCollectionsPlugin, shopifyConfig);
const ShopifyProductsPlugin = getShopifyProductsPlugin();
setPluginConfig(ShopifyProductsPlugin, shopifyConfig);

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'scully-plugins',
  outDir: './dist/static',
  routes: {
    '/shopify-collections/:collectionHandle': {
        type: ShopifyCollectionsPlugin,
        query: {},
        collectionHandle: {
            property: 'handle'
        }
    },
    '/shopify-collections/:collectionHandle/:id': {
        type: ShopifyCollectionsPlugin,
        query: {
            first: 10
        },
        collectionHandle: {
            property: 'handle'
        },
        id: {
            property: 'id'
        }
    },
    '/shopify-product/:productHandle': {
        type: ShopifyProductsPlugin,
        query: {},
        productHandle: {
            property: 'handle'
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

## Questions or Issues

If you have any issues you can raise them here or contact me at: [GammaStream](https://gamma.stream)
