import * as service from "../services/user.service.js";

dotenv.config();

const createUser = async (req, res, evt, id) => {
    const { status, message } = await service.createUser(req, res, evt, id);
    return res.status(status).json({ message });
};

const getUser = async (req, res) => {
    const { status, message, user } = await service.getUser(req, res);
    if (user) {
        return res.status(status).json({ user });
    }
    return res.status(status).json({ message });
}

const deleteUser = async (req, res) => {
    const { status, message, data } = await service.deleteUser(req, res);
    if (data) {
        return res.status(status).json({ message, data });
    }
    return res.status(status).json({ message });
};

const deleteUserWebhook = async (req, res, evt, id) => {
    const { status, message } = await service.deleteUserWebhook(req, res, evt, id);
    return res.status(status).json({ message });
};

const handleWebhook = (req, res) => {
    const { status, message } = service.handleWebhook(req, res);
    return res.status(status).json({ message });
};

export {
    createUser,
    getUser,
    deleteUser,
    deleteUserWebhook,
    handleWebhook
}