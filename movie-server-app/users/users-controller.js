import * as usersDao from "./users-dao.js";

// C(post) R(get) U(put) D(delete)
const UserController = (app) => {
    app.get("/api/users", findUsers); // request pattern /api/users to call a function
    app.get("/api/users/:uid", findUserById); // map path pattern to handler function,
    // parameter: uid
    app.post("/api/users", createUser);
    app.delete("/api/users/:uid", deleteUser);
    app.put("/api/users/:uid", updateUser);
};

const updateUser = async (req, res) => {
    const id = req.params.uid;
    const status = await usersDao.updateUser(id, req.body);
    req.session["currentUser"] = await usersDao.findUserById(id);
    res.json(status);
};

const deleteUser = async (req, res) => {
    const id = req.params.uid;
    const status = await usersDao.deleteUser(id);
    res.json(status);
};

const createUser = async (req, res) => {
    const newUser = await usersDao.createUser(req.body);
    res.json(newUser);
};

const findUserById = async (req, res) => {
    const id = req.params.uid;
    const user = await usersDao.findUserById(id);
    res.json(user);
};

const findUsers = async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    if (username && password) {
        const user = await usersDao.findUserByCredentials(username, password);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } else if (username) {
        const user = await usersDao.findUserByUsername(username);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } else {
        const users = await usersDao.findAllUsers();
        res.json(users);
    }
};

export default UserController;