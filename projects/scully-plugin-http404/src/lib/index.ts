import { registerPlugin, HandledRoute, getPluginConfig } from '@scullyio/scully';
import { scullyConfig } from '@scullyio/scully/lib/utils/config';

declare var require: any;
const path = require('path');
const fs = require('fs');


export const http404Plugin = async (html: string, route: HandledRoute) => {
  if ( route.route === '/404' ) {
    const http404OutFile = path.join(scullyConfig.outDir, '404.html');
    fs.writeFileSync(http404OutFile, html, () => {
      console.log(`Started @gammastream/scully-plugin-http404 -- saved 404.html`);
    });
    return Promise.resolve(html);
  } else {
    return Promise.resolve(html);
  }
};

const Http404Plugin = 'http404';
const validator = async conf => [];
registerPlugin('render', Http404Plugin, http404Plugin, validator);

export const getHttp404Plugin = () => Http404Plugin;
