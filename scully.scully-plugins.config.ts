import { ScullyConfig, setPluginConfig } from '@scullyio/scully';
import { getSitemapPlugin } from './dist/scully-plugin-sitemap';
import { getRegexPlugin } from './dist/scully-plugin-regex';
import { getHttp404Plugin } from './dist/scully-plugin-http404';


const SitemapPlugin = getSitemapPlugin();
setPluginConfig(SitemapPlugin, {
    urlPrefix: 'https://gamma.stream',
    sitemapFilename: 'sitemap.xml',
    merge: false,
    changeFreq: 'monthly',
    priority: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'],
    ignoredRoutes: ['/404'],
    routes: {
        '/products/:productId': {
            changeFreq: 'daily',
            priority: '0.9',
            sitemapFilename: 'sitemap-products.xml',
            merge: true,
        },
    }
});

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

export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'scully-plugins',
  outDir: './dist/static',
  defaultPostRenderers: [RegexPlugin, Http404Plugin],
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
