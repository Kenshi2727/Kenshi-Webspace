import { randomUUID } from "node:crypto";

const requestIdMiddleware = (req, res, next) => {
    const incomingRequestId = req.get("X-Request-ID");

    const requestId = incomingRequestId || randomUUID();

    req.requestId = requestId;

    res.setHeader("X-Request-ID", requestId);

    next();
};

export default requestIdMiddleware;