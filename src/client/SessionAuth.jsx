import React, { useState } from 'react';
import axios from 'axios';

function SessionAuth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  const register = async () => {
    try {
      const res = await axios.post('/api/sessionAuth/sessionRegister', { username, password }, { withCredentials: true });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  const login = async () => {
    try {
      const res = await axios.post('/api/sessionAuth/sessionLogin', { username, password }, { withCredentials: true });
      setUser(res.data.user);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post('/api/sessionAuth/clearSession', {}, { withCredentials: true });
      setUser(null);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Logout failed');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Session Auth</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      <br /><br />
      {message && <p>{message}</p>}
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
}

export default SessionAuth;
