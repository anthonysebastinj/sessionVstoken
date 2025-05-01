import bcrypt from 'bcrypt';
import User from '../model/model.js';

export async function sessionRegister(req, res){
    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
      } catch (error) {
        res.status(500).json({ error: 'Error registering user' });
      }
}

export async function sessionLogin(req, res){
    try {
        const { username, password } = req.body;
        
        
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
    
        req.session.user = user; // Store user session
        res.cookie('session_id', req.sessionID, { httpOnly: true });
        res.json({ message: 'Login successful', sessionID :req.sessionID, user });
      } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
      }
}

export async function clearSession(req, res){
    req.session.destroy();
    res.clearCookie('session_id');
    res.json({ message: 'Logged out successfully' });
}