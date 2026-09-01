/*
Connection timeout
Proxy timeout 
Request timeout  
*/

export const TIMEOUTS = {
    CONNECTION: Number(process.env.CONNECTION_TIMEOUT),
    REQUEST: Number(process.env.REQUEST_TIMEOUT),
    PROXY: Number(process.env.PROXY_TIMEOUT)
};