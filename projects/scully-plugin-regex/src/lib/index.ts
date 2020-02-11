import { registerPlugin, HandledRoute, ScullyConfig } from '@scullyio/scully';
import { scullyConfig } from '@scullyio/scully/utils/config';

class RegexReplacement {
  from: string | RegExp;
  to: string;
}

class RegexOptions {
  replacements: RegexReplacement[];
}

const defaultRegexOptions: RegexOptions = {
  replacements: []
};

export interface RegexHandledRoute extends HandledRoute {
  regexOptions: RegexOptions;
}

export interface RegexScullyConfig extends ScullyConfig {
  regexOptions: RegexOptions;
}


export const regexPlugin = async (html: string, route: RegexHandledRoute) => {
  let options = defaultRegexOptions;

  if ( route.regexOptions ) {
    options = {
      ...defaultRegexOptions,
      ...route.regexOptions,
    };
  } else if ((scullyConfig as RegexScullyConfig).regexOptions) {
    options = {
      ...defaultRegexOptions,
      ...(scullyConfig as RegexScullyConfig).regexOptions,
    };
  }

  let regexedHtml = html;
  if ( options.replacements ) {
    options.replacements.forEach((replacement) => {
      if ( typeof replacement.from === 'string' ) {
        regexedHtml = regexedHtml.replace(new RegExp(replacement.from, 'g'), replacement.to);
      } else if ( replacement.from instanceof RegExp ) {
        regexedHtml = regexedHtml.replace(replacement.from, replacement.to);
      }
    });
  }
  return Promise.resolve(regexedHtml);
};

export const RegexHtml = 'regexHtml';
registerPlugin('render', RegexHtml, regexPlugin);
