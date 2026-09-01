import { HTTP_STATUS } from "../constants/http.constants.js";
import { HEADERS } from "../constants/header.constants.js";
import logger from "../logger/index.js";

const attachGatewaySecret = (proxyReq) => {
    const secret = process.env.GATEWAY_SECRET;

    if (!secret) {
        // todo: implement logic after global error handling is enabled
        return false;
    }

    // attaching Gateway secret
    proxyReq.setHeader(HEADERS.GATEWAY_SECRET, secret);
    logger.debug(`Attached Secret Value:${secret}`)

    return true;
}

export default attachGatewaySecret;