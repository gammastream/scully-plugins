const { RegexHtml } = require('./dist/scully-plugin-regex');

const postRenderers = [ RegexHtml ];

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
  outDir: './dist/static',
  routes: {
  }
};