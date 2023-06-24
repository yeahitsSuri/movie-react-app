import UsersModel from "./users-model.js";

export function findAllUsers() {
    return UsersModel.find();
}

export function findUserByUsername(username) {
    return UsersModel.findOne({username: username});
}

export const findUserByCredentials = (username, password) => {
    return UsersModel.findOne({username, password});
}

export const findUserById = (userId) => {
    return UsersModel.findOne({_id: userId});
}

export const createUser = (user) => {
    return UsersModel.create(user);
}

export const updateUser = (id, user) => {
    return UsersModel.updateOne({_id: id}, {$set: user});
}

export const deleteUser = (id) => {
    return UsersModel.deleteOne({_id: id});
}