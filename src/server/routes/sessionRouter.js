import express from 'express';
import { clearSession, sessionLogin, sessionRegister } from '../controller/sessionController.js';

const router = express.Router();

router.post('/sessionRegister', sessionRegister);
router.post('/sessionLogin', sessionLogin);
router.post('/clearSession', clearSession);

export default router;