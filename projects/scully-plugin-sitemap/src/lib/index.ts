import { registerPlugin, HandledRoute, ScullyConfig, getPluginConfig } from '@scullyio/scully';
import { scullyConfig } from '@scullyio/scully';
import { SitemapConfig, defaultSitemapConfig } from './sitemap-config';

declare var require: any;
const fs = require('fs');
const path = require('path');
const builder = require('xmlbuilder');
const url = require('url');
const pathToRegexp = require('path-to-regexp');

const today  = new Date();

const priorityForLocation = (loc: string, config: SitemapConfig) => {
  if (typeof config.priority === 'string' || config.priority instanceof String) {
    return config.priority;
  } else if ( Array.isArray(config.priority) ) {
    const segments = loc.split('/');
    return config.priority[segments.length - 1];
  } else {
    return '0.5';
  }
};

const pluralizer = (num: number, singular: string, plural: string) => {
  return num === 1 ? singular : plural;
};

const configForRoute = (config: SitemapConfig, route: HandledRoute) => {
  if ( config.routes ) {
    // tslint:disable-next-line: forin
    for (const routePath in config.routes) {
      const routeConfig = config.routes[routePath];
      if ( route.route.match(routeConfig.regexp) ) {
        return {
          route: route.route,
          urlPrefix: routeConfig.urlPrefix || config.urlPrefix,
          sitemapFilename: routeConfig.sitemapFilename || config.sitemapFilename,
          changeFreq: routeConfig.changeFreq || config.changeFreq,
          priority: routeConfig.priority || config.priority
        };
      }
    }
  }
  return {
    route: route.route,
    urlPrefix: config.urlPrefix,
    sitemapFilename: config.sitemapFilename,
    changeFreq: config.changeFreq,
    priority: config.priority
  };
};

const getMapForRoute = (maps: any, routeConfig: any) => {
  let map = maps[routeConfig.sitemapFilename];
  if ( !map ) {
    map = builder.create('urlset').att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
    maps[routeConfig.sitemapFilename] = map;
  }
  return map;
};

export const sitemapPlugin = async (routes: HandledRoute[]) => {
  const config = Object.assign({}, defaultSitemapConfig, getPluginConfig(SitemapPlugin));

  const log = (message?: any, ...optionalParams: any[]): void => {
    if (!config.suppressLog) {
      console.log( message, ...optionalParams);
    }
  };

  log(`Started @gammastream/scully-plugin-sitemap`);
  log(`Generating sitemaps for ${ routes.length } ${ pluralizer(routes.length, 'route', 'routes') }.`);

  // parse route configurations
  if ( config.routes ) {
    Object.keys(config.routes).forEach(key => {
      config.routes[key].regexp = pathToRegexp(key);
    });
  }

  const maps = {};

  routes.forEach((route: HandledRoute) => {
    if ( config.ignoredRoutes && config.ignoredRoutes.includes(route.route) ) {
      return;
    }
    const routeConfig = configForRoute(config, route);
    const map = getMapForRoute(maps, routeConfig);
    const urlElement = map.ele('url');
    urlElement.ele('loc', url.resolve(routeConfig.urlPrefix, route.route));
    urlElement.ele('changefreq', routeConfig.changeFreq);
    urlElement.ele('lastmod', today.toISOString());
    urlElement.ele('priority', priorityForLocation(route.route, routeConfig));
  });

  // tslint:disable-next-line: forin
  for (const filename in maps) {
    const sitemapFile = path.join(scullyConfig.outDir, filename);
    const rootElement = maps[filename];
    const xml = rootElement.end({ pretty: true});
    fs.writeFileSync(sitemapFile, xml);
    const routeCount = rootElement.children.length;
    log(`Wrote ${ routeCount } ${ pluralizer(routeCount, 'route', 'routes') } to ${ filename }`);
  }

  log(`Finished @gammastream/scully-plugin-sitemap`);

  return Promise.resolve('done');
};

const SitemapPlugin = 'sitemap';
const validator = async conf => [];
registerPlugin('routeDiscoveryDone', SitemapPlugin, sitemapPlugin, validator);

export const getSitemapPlugin = () => SitemapPlugin;
