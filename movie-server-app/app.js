import express from 'express'
import cors from 'cors'
import session from 'express-session'
import mongoose from 'mongoose';

import UserController from "./users/users-controller.js"
import ReviewsController from "./reviews/reviews-controller.js";
import AuthController from "./users/auth-controller.js";


const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/movie-react-app';
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
    session({
                secret: "any string",
                resave: false,
                saveUninitialized: true,
            })
);
app.use(
    cors({
             credentials: true,
             origin: "http://localhost:3000",
         }))

app.use(express.json());

AuthController(app);
ReviewsController(app);
UserController(app);
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});