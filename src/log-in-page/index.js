import React, {useState} from "react";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {loginThunk} from "../services/auth-thunks";

function LoginScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async () => {
        try {
            const response = await dispatch(loginThunk({username, password}));
            if (response.error) {
                alert(response.payload.message);
            } else {
                localStorage.setItem("last-search", "");
                navigate("/home");
            }
        } catch (e) {
            alert(e);
        }
    };
    return (
        <div>
            <h1>Login</h1>
            <div>
                <a href={"/register"}>Don't have an account yet? Click here to register one</a>
            </div>
            <div className={"mt-2"}>
                <label>Username</label>
                <input className={"form-control"} type={"text"} value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div className={"mt-2"}>
                <label>Password</label>
                <input className={"form-control"} type={"password"} value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div>
                <button className={"btn btn-primary mt-2"} onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default LoginScreen;