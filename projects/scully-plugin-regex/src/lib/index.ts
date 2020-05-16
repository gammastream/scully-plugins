import { registerPlugin, HandledRoute, getPluginConfig } from '@scullyio/scully';

declare var require: any;
const pathToRegexp = require('path-to-regexp');

class RegexReplacement {
  from: string | RegExp;
  to: string;
}

class RegexConfig {
  /** The replacements you want to perform. */
  replacements: RegexReplacement[];

  /** List of optional configuration for specific routes */
  routes?: any[];

  /** If `true`, the plugin will not log status messages to the console. */
  suppressLog?: boolean;
}

const defaultRegexConfig: RegexConfig = {
  replacements: []
};

const configForRoute = (config: RegexConfig, route: HandledRoute) => {
  if ( config.routes ) {
    // tslint:disable-next-line: forin
    for (const routePath in config.routes) {
      const routeConfig = config.routes[routePath];
      if ( route.route.match(routeConfig.regexp) ) {
        return {
          route: route.route,
          replacements: routeConfig.replacements
        };
      }
    }
  }
  return {
    route: route.route,
    replacements: config.replacements
  };
};


export const regexPlugin = async (html: string, route: HandledRoute) => {
  const config = Object.assign({}, defaultRegexConfig, getPluginConfig(RegexPlugin));

  const log = (message?: any, ...optionalParams: any[]): void => {
    if (!config.suppressLog) {
      console.log( message, ...optionalParams);
    }
  };

  log(`Started @gammastream/scully-plugin-regex`);

  // parse route configurations
  if ( config.routes ) {
    Object.keys(config.routes).forEach(key => {
      config.routes[key].regexp = pathToRegexp(key);
    });
  }

  const routeConfig = configForRoute(config, route);

  let regexedHtml = html;
  if ( routeConfig.replacements ) {
    routeConfig.replacements.forEach((replacement) => {
      if ( typeof replacement.from === 'string' ) {
        regexedHtml = regexedHtml.replace(new RegExp(replacement.from, 'g'), replacement.to);
      } else if ( replacement.from instanceof RegExp ) {
        regexedHtml = regexedHtml.replace(replacement.from, replacement.to);
      }
    });
  }

  log(`Finished @gammastream/scully-plugin-regex`);

  return Promise.resolve(regexedHtml);
};

const RegexPlugin = 'regex';
const validator = async conf => [];
registerPlugin('render', RegexPlugin, regexPlugin, validator);

export const getRegexPlugin = () => RegexPlugin;
