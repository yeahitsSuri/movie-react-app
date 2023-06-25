import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
                                                  username: String,
                                                  password: String,
                                                  role: String,
                                                  firstName: String,
                                                  lastName: String,
                                                  email: String,
    list: Array // for normal users, it's an array of favorite movies
    // for admin users, it's an array of movies to recommend on home page
    // this array contains id of movies
                                              }, {collection: "users"});

export default UsersSchema;