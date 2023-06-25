import React, {useState} from'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { registerThunk } from '../services/auth-thunks';

function RegisterScreen() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('user');
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = async () => {
        try {
            await dispatch(registerThunk(
                { username, password, 
                    role, firstName, lastName, email})).unwrap();
            navigate("/profile");
        } catch (e) {
            alert("Register failed: " + e.message);
        }
    };

    return (
      <div>
        <h1>Register Screen</h1>
        
        { /* username */ }
        <div className="mt-2 mb-2">
          <label>Username</label>
          <input
            className="form-control"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        
        { /* password */ }
        <div className="mt-2 mb-2">
          <label >Password</label>
          <input
            className="form-control"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        { /* choose user type */ }
        <div className="mt-2">
            <label>Choose User Type: </label>
            <div style={{ marginTop: '0.5rem' }}>
                <label style={{ marginRight: '1rem' }}>
                <input
                    type="radio"
                    value="user"
                    checked={role === 'user'}
                    onChange={() => setRole('user')}
                />
                User
                </label>
                <label>
                <input
                    type="radio"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                />
                Admin
                </label>
            </div>
        </div>

        { /* first name */ }
        <div className="mt-2 mb-2">
          <label>Frist Name</label>
          <input
            className="form-control"
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </div>

        { /* last name */ }
        <div className="mt-2 mb-2">
          <label>Last Name</label>
          <input
            className="form-control"
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </div>

        { /* email */ }
        <div className="mt-2 mb-2">
          <label>Email</label>
          <input
            className="form-control"
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>


        <button className="btn btn-primary mt-2" onClick={handleRegister}>
          Register
        </button>
      </div>
    );
}

export default RegisterScreen;