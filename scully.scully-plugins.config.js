const { RegexHtml } = require('./dist/scully-plugin-regex');
const { Sitemap } = require('./dist/scully-plugin-sitemap');
const { Http404 } = require('./dist/scully-plugin-http404');

const postRenderers = [ Sitemap, Http404 ];

const regexOptions = {
  replacements: [{
    from: 'ScullyPlugins',
    to: 'Michael'
  }, {
    from: new RegExp('([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)', 'gi'),
    to: '<a href="mailto:$1">$1</a>'
  }]
};

exports.config = {
  projectRoot: "./src",
  projectName: "scully-plugins",
  defaultPostRenderers: postRenderers,
  regexOptions,
  sitemapOptions: {
    urlPrefix: 'https://gamma.stream',
    sitemapFilename: 'sitemap.xml',
    changeFreq: 'monthly',
    priority: ['1.0', '0.9', '0.8', '0.7', '0.6', '0.5', '0.4', '0.3', '0.2', '0.1', '0.0'],
    ignoredRoutes: ['/404']
  },
  outDir: './dist/static',
  routes: {
  }
};