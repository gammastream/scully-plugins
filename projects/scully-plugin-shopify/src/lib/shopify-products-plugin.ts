import { registerPlugin, HandledRoute, getPluginConfig, routeSplit, logError, yellow } from '@scullyio/scully';
import { defaultShopifyConfig } from './shopify-config';
import { getClient } from './shopify-client';



export const shopifyProductsPlugin = async (route: string, routeConfig: any): Promise<HandledRoute[]> => {
try {
    const { params, createPath } = routeSplit(route);
    const missingParams = params.filter((param) => !routeConfig.hasOwnProperty(param.part));
    if (missingParams.length > 0) {
        console.error(`missing config for parameters (${missingParams.join(',')}) in route "${yellow(route)}" - skipping`);
        return [{ route, type: routeConfig.type }];
    }

    const config = Object.assign({}, defaultShopifyConfig, getPluginConfig(ShopifyProductsPlugin));
    const client = getClient(config);
    const query = Object.assign({
        first: 20,
        sortKey: 'TITLE',
        reverse: false
        }, (routeConfig.query || {}));
    const products = await client.product.fetchQuery(query);

    const routes = products.map((product) => {
        const data = [];
        params.forEach((param) => {
            data.push( product[routeConfig[param.part].property] );
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

const ShopifyProductsPlugin = 'shopifyProducts';
const validator = async conf => [];
registerPlugin('router', ShopifyProductsPlugin, shopifyProductsPlugin, validator);

export const getShopifyProductsPlugin = () => ShopifyProductsPlugin;
