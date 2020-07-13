/**
 * The sitemap configuration options.
 */
export class SitemapConfig {

    /** What is the base url to your app. */
    urlPrefix: string;

    /** Where do you want to store the sitemap file? */
    sitemapFilename: string;

    /** Merge handled routes into existing sitemap file (if available)? */
    merge?: boolean;

    /** How often is the route expected to change? */
    changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';

    /** A list of priorities to set based on number of segments in the route */
    priority?: string | string[];

    /** A list of routes not to include in the sitemap */
    ignoredRoutes?: string[];

    /** If `true`, the plugin will not log status messages to the console. */
    suppressLog?: boolean;

    /** List of optional configuration for specific routes */
    routes?: any[];

}

/**
 * The default configuration
 */
export const defaultSitemapConfig: SitemapConfig = {
    urlPrefix: 'http://localhost',
    sitemapFilename: 'sitemap.xml',
    merge: false,
    changeFreq: 'monthly',
    priority: '0.5',
    suppressLog: false
};
