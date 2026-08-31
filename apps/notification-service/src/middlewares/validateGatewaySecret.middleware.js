const validateGatewaySecret = (req, res, next) => {
    if (!req.headers || !req.get("x-gateway-secret")) {
        // todo: logoc for global error handling
        console.log("Headers or Gateway Secret not found!")
        return res.status(403).json({
            error: "Forbidden!",
            message: "Gateway secret header not found!"
        })
    }
    else if (req.get("x-gateway-secret") === process.env.GATEWAY_SECRET) {
        console.log("Gateway Secret verified!")
        next();
    }
    else {
        console.log("Invalid Gateway Secret!")
        return res.status(403).json({
            error: "Forbidden!",
            message: "Gateway secret is invalid!"
        })
    }
}

export default validateGatewaySecret;