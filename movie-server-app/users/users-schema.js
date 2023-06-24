import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
                                                  username: String,
                                                  password: String,
                                                  role: String,
                                                  firstName: String,
                                                  lastName: String,
                                                  email: String,
                                              }, {collection: "users"});

export default UsersSchema;