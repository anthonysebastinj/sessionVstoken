import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './client/HomePage';
import SessionAuth from './client/SessionAuth';
import JwtAuth from './client/JwtAuth';

import './App.css';

function App() {
  return (
    <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
          <Route path="/session" element={<SessionAuth />} />
          <Route path="/jwt" element={<JwtAuth />} />
        </Routes>
    </Router>
  );
}

export default App;
