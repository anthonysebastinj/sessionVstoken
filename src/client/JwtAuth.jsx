import React, { useState } from 'react';
import axios from 'axios';

function JwtAuth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [protectedData, setProtectedData] = useState(null);

  const register = async () => {
    try {
      const res = await axios.post('/api/tokenAuth/jwtRegister', { username, password });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Registration failed');
    }
  };

  const login = async () => {
    try {
      const res = await axios.post('/api/tokenAuth/jwtLogin', { username, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Login failed');
    }
  };

  const accessProtectedRoute = async () => {
    try {
      const res = await axios.get('/api/tokenAuth/protected', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProtectedData(res.data);
      setMessage('Accessed protected route');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Access denied');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setProtectedData(null);
    setMessage('Logged out');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>JWT Auth</h2>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <br /><br />
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={accessProtectedRoute}>Access Protected</button>
      <button onClick={logout}>Logout</button>
      <br /><br />
      {message && <p>{message}</p>}
      {protectedData && (
        <pre>{JSON.stringify(protectedData, null, 2)}</pre>
      )}
    </div>
  );
}

export default JwtAuth;
