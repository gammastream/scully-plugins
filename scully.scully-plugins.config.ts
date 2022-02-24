import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { SitemapConfig, getSitemapPlugin } from './dist/scully-plugin-sitemap';
import { getRegexPlugin } from './dist/scully-plugin-regex';
import { getHttp404Plugin } from './dist/scully-plugin-http404';
import { getEmojiPlugin } from './dist/scully-plugin-emoji';
import { getShopifyCollectionsPlugin , getShopifyProductsPlugin} from './dist/scully-plugin-shopify';
import * as dotenv from 'dotenv';
dotenv.config();

const SitemapPlugin = getSitemapPlugin();
const sitemapConfig: SitemapConfig = {
  urlPrefix: 'https://gamma.stream',
  sitemapFilename: 'sitemap.xml',
  merge: false,
  changeFreq: 'monthly',
  priority: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'],
  ignoredRoutes: ['/404'],
  routes: {
      '/products/:productId': {
          trailingSlash: true,
          changeFreq: 'daily',
          priority: '0.9',
          sitemapFilename: 'sitemap-products.xml',
          merge: false,
      },
      '/shopify-collections/:collectionHandle': {
          changeFreq: 'daily',
          priority: '0.9',
          sitemapFilename: 'sitemap-shopify.xml',
          merge: true,
      },
      '/shopify-collections/:collectionHandle/:id': {
          changeFreq: 'daily',
          priority: '0.9',
          sitemapFilename: 'sitemap-shopify.xml',
          merge: true,
      },
      '/shopify-product/:productHandle': {
          changeFreq: 'daily',
          priority: '0.9',
          sitemapFilename: 'sitemap-shopify.xml',
          merge: true,
      },
  }
}
setPluginConfig(SitemapPlugin, sitemapConfig);

const RegexPlugin = getRegexPlugin();
setPluginConfig(RegexPlugin, {
    replacements: [{
        from: 'foo',
        to: 'foobar'
    }, {
        from: new RegExp('([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)', 'gi'),
        to: '<a href="mailto:$1">$1</a>'
    }],
    routes: {
        '/products/:productId': {
            replacements: [{
                from: 'foo',
                to: 'foofoo'
            }]
        },
    }
});

const Http404Plugin = getHttp404Plugin();
const EmojiPlugin = getEmojiPlugin();
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
  defaultPostRenderers: [RegexPlugin, Http404Plugin, EmojiPlugin],
  routes: {
    '/products/:productId': {
        type: 'json',
        productId: {
            url: 'http://localhost:4200/assets/products.json',
            property: 'id',
        }
    },
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
