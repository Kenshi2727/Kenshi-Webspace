const IDENTITY_HEADERS = [
    'x-user-id',
    'x-gateway-secret',
    'x-user-role',
    'x-user-email',
    'x-tenant-id',
    // add any other identity/authz headers your services trust
];


function stripIdentityHeaders(req, res, next) {
    IDENTITY_HEADERS.forEach((header) => {
        delete req.headers[header.toLowerCase()];
    });
    next();
}

export default stripIdentityHeaders;