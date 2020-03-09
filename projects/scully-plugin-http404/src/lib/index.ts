import { registerPlugin, HandledRoute } from '@scullyio/scully';
import { scullyConfig } from '@scullyio/scully/utils/config';

const path = require('path');
const fs = require('fs');


export const http404Plugin = async (html: string, route: HandledRoute) => {
  if ( route.route === '/404' ) {
    const http404OutFile = path.join(scullyConfig.outDir, '404.html');
    return fs.writeFile(http404OutFile, html, () => {
      console.log('saved 404.html');
      return Promise.resolve(html);
    });
  } else {
    // nothing to do here.
    return Promise.resolve(html);
  }
};

export const Http404 = 'http404';
const validator = async conf => [];
registerPlugin('render', Http404, http404Plugin, validator);
