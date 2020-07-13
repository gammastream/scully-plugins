import { registerPlugin, HandledRoute, getPluginConfig, routeSplit, logError, yellow } from '@scullyio/scully';
import { defaultShopifyConfig } from './shopify-config';
import { getClient } from './shopify-client';


export const shopifyCollectionsPlugin = async (route: string, routeConfig: any): Promise<HandledRoute[]> => {
  try {
    const { params, createPath } = routeSplit(route);
    const missingParams = params.filter((param) => !routeConfig.hasOwnProperty(param.part));
    if (missingParams.length > 0) {
      console.error(`missing config for parameters (${missingParams.join(',')}) in route: ${route}. Skipping`);
      return [{ route, type: routeConfig.type }];
    }

    const config = Object.assign({}, defaultShopifyConfig, getPluginConfig(ShopifyCollectionsPlugin));
    const client = getClient(config);
    const query = Object.assign({
        first: 20,
        sortKey: 'TITLE',
        reverse: false
      }, (routeConfig.query || {}));
    const collections = await client.collection.fetchQuery(query);

    const routes = collections.map((collection) => {
        const data = [];
        params.forEach((param) => {
            data.push( collection[routeConfig[param.part].property] );
        });
        return data;
    });
    return routes.map((routeData: string[]) => ({
      route: createPath(...routeData),
      type: routeConfig.type,
    }));
  } catch (e) {
    console.log( e );
    logError(`Could not fetch data for route "${yellow(route)}"`);
    return [{ route, type: routeConfig.type }];
  }
};

const ShopifyCollectionsPlugin = 'shopifyCollections';
const validator = async conf => [];
registerPlugin('router', ShopifyCollectionsPlugin, shopifyCollectionsPlugin, validator);

export const getShopifyCollectionsPlugin = () => ShopifyCollectionsPlugin;
