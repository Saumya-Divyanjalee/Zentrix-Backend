import { Router } from 'express';
import { register, login, getProfile, updateProfile } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';
import { registerValidation, loginValidation } from '../validators/auth.validator';

const router = Router();
router.post('/register', registerValidation, register);
router.post('/login',    loginValidation,    login);
router.get('/profile',   protect,            getProfile);
router.put('/profile',   protect,            updateProfile);
export default router;
