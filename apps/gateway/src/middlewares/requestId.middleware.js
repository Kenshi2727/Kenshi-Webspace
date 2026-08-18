import { randomUUID } from "node:crypto";
import { HEADERS } from "../constants/header.constants.js";
import { HTTP_STATUS } from "../constants/http.constants.js";

const requestIdMiddleware = (req, res, next) => {
    const incomingRequestId = req.get(HEADERS.REQUEST_ID);

    if (incomingRequestId && typeof incomingRequestId !== 'string') {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "[POTENTIAL MALACIOUS ATTACK!] Inavlid Request ID receieved!"
        });

        // todo: logging and error handling
    }

    const requestId = incomingRequestId || randomUUID();
    req.requestId = requestId;
    res.setHeader(HEADERS.REQUEST_ID, requestId);

    next();
};

export default requestIdMiddleware;