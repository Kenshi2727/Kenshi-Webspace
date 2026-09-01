function injectVerifiedIdentityHeaders(req, res, next) {
    if (!req.user) {
        // No verified identity — don't inject anything.
        return next();
    }

    req.headers['x-user-id'] = String(req.user.id);
    req.headers['x-user-role'] = req.user.role || '';
    req.headers['x-gateway-secret'] = process.env.GATEWAY_INTERNAL_SECRET;

    next();
}

export default injectVerifiedIdentityHeaders;