import { registerPlugin, HandledRoute, ScullyConfig } from '@scullyio/scully';
import { scullyConfig } from '@scullyio/scully/utils/config';

declare var require: any;
const fs = require('fs');
const path = require('path');
const builder = require('xmlbuilder');


// used to store state between page renderings
const routes: string[] = [];
const today  = new Date();


class SitemapOptions {
  urlPrefix: string;
  sitemapFilename: string;
  changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
}

const defaultSitemapOptions: SitemapOptions = {
  urlPrefix: 'http://localhost',
  sitemapFilename: 'sitemap.xml',
  changeFreq: 'monthly'
};

export interface SitemapHandledRoute extends HandledRoute {
  sitemapOptions: SitemapOptions;
}

export interface SitemapScullyConfig extends ScullyConfig {
    sitemapOptions: SitemapOptions;
}


export const sitemapPlugin = async (html: string, route: SitemapHandledRoute) => {
  let options = defaultSitemapOptions;

  routes.push(route.route);
  // console.log( { routes } );

  if ( route.sitemapOptions ) {
    options = {
      ...defaultSitemapOptions,
      ...route.sitemapOptions,
    };
  } else if ((scullyConfig as SitemapScullyConfig).sitemapOptions) {
    options = {
      ...defaultSitemapOptions,
      ...(scullyConfig as SitemapScullyConfig).sitemapOptions,
    };
  }

  const sitemapFile = path.join(scullyConfig.outDir, options.sitemapFilename);
  try {
    const rootElement = builder.create('urlset', {
      xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9"'
    });
    routes.forEach((url) => {
      const urlElement = rootElement.ele('url');
      urlElement.ele('loc', path.join(options.urlPrefix, url));
      urlElement.ele('changefreq', options.changeFreq);
      urlElement.ele('lastmod', today.toISOString());
      urlElement.ele('priority', '0.5');
    });
    const xml = rootElement.end({ pretty: true});
    fs.writeFile(sitemapFile, xml, () => {
      console.log('saved sitemap');
    });
  } catch ($e) {
    console.log($e);
  }

  return Promise.resolve(html);
};

export const Sitemap = 'sitemap';
const validator = async conf => [];
registerPlugin('render', Sitemap, sitemapPlugin, validator);
