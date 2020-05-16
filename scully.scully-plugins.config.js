"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var scully_1 = require("@scullyio/scully");
var scully_plugin_sitemap_1 = require("./dist/scully-plugin-sitemap");
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
exports.config = {
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
