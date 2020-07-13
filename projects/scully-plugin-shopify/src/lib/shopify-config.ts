/**
 * The shopify configuration options.
 */
export class ShopifyConfig {

  /** The shopify domain */
  domain: string;

  /** The shopify StoreFront access token */
  storefrontAccessToken: string;


  /** If `true`, the plugin will not log status messages to the console. */
  suppressLog?: boolean;

}

/**
 * The default configuration
 */
export const defaultShopifyConfig: ShopifyConfig = {
  domain: null,
  storefrontAccessToken: null
};
