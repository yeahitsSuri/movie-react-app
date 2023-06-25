import {createAsyncThunk} from "@reduxjs/toolkit";
import * as authService from "./auth-service";

export const loginThunk = createAsyncThunk(
    "user/login", async ({username, password}) => {
        return await authService.login({username, password});
    }
)

export const profileThunk = createAsyncThunk(
    "auth/profile", async () => {
        return await authService.profile();
    }
)

export const logoutThunk = createAsyncThunk(
    "auth/logout", async () => {
        return await authService.logout();
    }
)

// update a user from users
export const updateUserThunk = createAsyncThunk(
    "auth/updateUser", async ({userId, user}) => {
        await authService.updateUser(userId, user);
        return user;
    }
)

export const registerThunk = createAsyncThunk(
    "user/register", async ({
                                username,
                                password,
                                role,
                                firstName,
                                showFirstName,
                                lastName,
                                showLastName,
                                email,
                                showEmail,
                                list,
                                showList
                            }) => {
        return await authService.register({
                                              username,
                                              password,
                                              role,
                                              firstName,
                                              showFirstName,
                                              lastName,
                                              showLastName,
                                              email,
                                              showEmail,
                                              list,
                                              showList
                                          });
    });