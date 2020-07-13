import { ShopifyConfig } from './shopify-config';
import Client from 'shopify-buy';

declare var require: any;
const fetch = require('node-fetch');

let client: any;


export const getClient = (config: ShopifyConfig) => {
  if (!client) {
    client = Client.buildClient({
      domain: config.domain,
      storefrontAccessToken: config.storefrontAccessToken
    }, fetch);
  }
  return client;
};
