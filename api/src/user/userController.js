const userService = require('./userServices');

const create = async (req, res) => {
    try {
        const result = await userService.create(req.body);
        if (result.status) {
            res.send({"status": true, "message": "Usuario creado"});
        } else {
            res.send({"status": false, "message": result.msg});
        }
    } catch (err) {
        console.log(err);
        res.send({"status": false, "message": err.msg});
    }
};

const login = async (req, res) => {
    try {
        const result = await userService.login(req.body);
        if (result.status) {
            res.send({"status": true, "message": result.msg});
        } else {
            res.send({"status": false, "message": result.msg});
        }

    } catch (err) {
        console.log(err);
        res.send({"status": false, "message": err.msg});
    }
};

const search = async (req, res) => {
    try {
        const result = await userService.search(req.body);
        if (result.status)
            res.send({"status": true, "message": result.msg});
        else
            res.send({"status": false, "message": result.msg});
        } catch (err) {
        console.log(err);
        res.send({"status": false, "message": err.msg});
    }
};

const getAll = async (req, res) => {
    try {
        const result = await userService.getAll();
        if (result.status)
            res.send({"status": true, "message": result.msg});
        else
            res.send({"status": false, "message": result.msg});
    } catch (err) {
        console.error(err);
        res.send({"status": false, "message": err.msg});
    }
};

const update = async (req, res) => {
    try {
        const result = await userService.update(req.body);
        if (result.status) {
            res.send({"status": true, "message": result.msg});
        } else {
            res.send({"status": false, "message": result.msg});
        }
    } catch (err) {
        console.log(err);
        res.send({"status": false, "message": err.msg});
    }
}

const remove = async (req, res) => {
    try {
        const result = await userService.remove(req.body);
        if (result.status)
            res.send({"status": true, "message": result.msg});
        else
            res.send({"status": false, "message": result.msg});
    } catch (err) {
        console.log(err);
        res.send({"status": false, "message": err.msg});
    }
}

module.exports = {
    getAll,
    create,
    login,
    search,
    update,
    remove
};
