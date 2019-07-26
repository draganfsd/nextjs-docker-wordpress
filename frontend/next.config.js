
// ************************************************************************************************
// ************************************************************************************************
// ************************************************************************************************
// ************************************************************************************************
// 
// 
// 
// 
// 
// 
// 
//                      Read process.env variables
// 
// 
// 
// 
// 
// 
// 
//
const NODE_ENV = process.env.NODE_ENV;
const PRODUCTION = NODE_ENV === 'production';
const API = PRODUCTION ? process.env.API_URL : 'http://localhost:8000';
const HOST_URL = PRODUCTION ? process.env.HOST_URL : 'http://localhost:3000';

// ************************************************************************************************
// ************************************************************************************************
// ************************************************************************************************
// ************************************************************************************************
// 
// 
// 
// 
// 
// 
// 
// 
//                      Wordpress API Configuration
// 
// 
// 
// 
// 
// 
// 
// 
const WPAPI = require('wpapi');
const WP_CUSTOM_ROUTES_CONFIG = require(process.env.WP_CUSTOM_ROUTES_CONFIG || './config/WPCustomRoutes');
const wp = new WPAPI({
    endpoint: `${API}/wp-json`,
    username: process.env.WP_USERNAME || 'test',
    password: process.env.WP_PASSWORD || 'test',
    auth: true
});

// Define the custom routes automatically based on config/WPCustomRoutes
const customRoutes = Object.keys(WP_CUSTOM_ROUTES_CONFIG);
for (let i = 0; i < customRoutes.length; i++) {
    const route = customRoutes[i];
    const info = WP_CUSTOM_ROUTES_CONFIG[route];
    wp[route] = wp.registerRoute("wp/v2", info.path, { params: info.params || [] });
}

// ************************************************************************************************
// ************************************************************************************************
// ************************************************************************************************
// ************************************************************************************************
// 
// 
// 
// 
// 
// 
// 
// 
//                  MODULE EXPORTS
// 
// 
// 
// 
// 
// 
// 
// 
module.exports = {
    env: {
        GA_KEY: '',
        HOTJAR_KEY: ''
    },
    publicRuntimeConfig: {
        HOST_URL,
        API,
        wp
    }
};
// ************************************************************************************************
// ************************************************************************************************
// ************************************************************************************************
// ************************************************************************************************
