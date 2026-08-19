/*
Connection timeout
Proxy timeout 
Request timeout  
*/

export const TIMEOUTS = {
    CONNECTION: process.env.CONNECTION_TIMEOUT,
    REQUEST: process.env.REQUEST_TIMEOUT,
    PROXY: process.env.PROXY_TIMEOUT
};