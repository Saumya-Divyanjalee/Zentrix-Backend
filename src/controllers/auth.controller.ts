import { Request, Response } from 'express';
import User from '../models/User';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken';
import { sendSuccess, sendCreated, sendError } from '../utils/ApiResponse';
import { AuthRequest } from '../types/auth.types';
import { sendWelcomeEmail } from '../utils/sendEmail';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) { res.status(400).json({ success: false, message: 'Email already registered' }); return; }
    const user = await User.create({ name, email, password });
    const accessToken = generateAccessToken(user.id, user.email, user.role);
    const refreshToken = generateRefreshToken(user.id);

    //sendWelcomeEmail(user.email, user.name); // await නෑ — background එකේ run වෙනවා, response slow වෙන්නේ නෑ

    sendCreated(res, {
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
      accessToken, refreshToken,
    }, 'Registration successful');
  }catch (error) {
  console.error('❌ Register error:', error);
  sendError(res, 'Server error', 500, error);
}
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ success: false, message: 'Invalid credentials' }); return;
    }
    const accessToken = generateAccessToken(user.id, user.email, user.role);
    const refreshToken = generateRefreshToken(user.id);
    sendSuccess(res, {
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
      accessToken, refreshToken,
    }, 'Login successful');
  } catch (error) {
  console.error('❌ Login error:', error);
  sendError(res, 'Server error', 500, error);
}
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user?.id).select('-password');
    if (!user) { res.status(404).json({ success: false, message: 'User not found' }); return; }
    sendSuccess(res, user);
  } catch (error) { sendError(res, 'Server error', 500, error); }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, avatar, password } = req.body;
    const user = await User.findById(req.user?.id);
    if (!user) { res.status(404).json({ success: false, message: 'User not found' }); return; }
    if (name) user.name = name;
    if (avatar) user.avatar = avatar;
    if (password) {
      if (password.length < 6) { res.status(400).json({ success: false, message: 'Password min 6 characters' }); return; }
      user.password = password;
    }
    await user.save();
    const updated = await User.findById(req.user?.id).select('-password');
    sendSuccess(res, updated, 'Profile updated');
  } catch (error) { sendError(res, 'Server error', 500, error); }
};