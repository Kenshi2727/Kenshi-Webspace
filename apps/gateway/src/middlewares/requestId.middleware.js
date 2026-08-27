import { randomUUID } from "node:crypto";
import { HEADERS } from "../constants/header.constants.js";
import { HTTP_STATUS } from "../constants/http.constants.js";
import logger from "../logger/index.js";

const requestIdMiddleware = (req, res, next) => {
    const incomingRequestId = req.get(HEADERS.REQUEST_ID);

    if (incomingRequestId && typeof incomingRequestId !== 'string') {
        logger.error("Request ID is inavlid!", {
            threat: "Potential Malicious Attack",
            incomingRequestId,
            ip: req.ip
        })

        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "[POTENTIAL MALACIOUS ATTACK!] Inavlid Request ID receieved!"
        });
    }

    const requestId = incomingRequestId || randomUUID();
    req.requestId = requestId;
    res.setHeader(HEADERS.REQUEST_ID, requestId);
    next();
};

export default requestIdMiddleware;