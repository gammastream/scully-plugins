"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scully_1 = require("@scullyio/scully");
var scully_plugin_sitemap_1 = require("./dist/scully-plugin-sitemap");
var scully_plugin_regex_1 = require("./dist/scully-plugin-regex");
var SitemapPlugin = scully_plugin_sitemap_1.getSitemapPlugin();
scully_1.setPluginConfig(SitemapPlugin, {
    urlPrefix: 'https://gamma.stream',
    sitemapFilename: 'sitemap.xml',
    changeFreq: 'monthly',
    priority: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'],
    ignoredRoutes: ['/404'],
    routes: {
        '/products/:productId': {
            changeFreq: 'daily',
            priority: '0.9',
            sitemapFilename: 'sitemap-products.xml'
        },
    }
});
var RegexPlugin = scully_plugin_regex_1.getRegexPlugin();
scully_1.setPluginConfig(RegexPlugin, {
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
                    to: 'foofo'
                }]
        },
    }
});
exports.config = {
    projectRoot: './src',
    projectName: 'scully-plugins',
    outDir: './dist/static',
    defaultPostRenderers: [RegexPlugin],
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
