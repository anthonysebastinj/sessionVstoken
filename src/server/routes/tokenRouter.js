import express from 'express';
import { jwtRegister, jwtLogin } from '../controller/tokenController.js';
import { authenticateToken } from '../controller/authMiddleware.js';


const router = express.Router();

router.post('/jwtRegister', jwtRegister);
router.post('/jwtLogin', jwtLogin);

// Protected route
router.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Protected content', user: req.user });
});

export default router;
