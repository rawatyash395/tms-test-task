import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { query } from '../db/connection';
import { User } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export const generateToken = (user: { id: number; email: string; role: string }) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; email: string; role: string };
  } catch (error) {
    return null;
  }
};

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const authenticateUser = async (email: string, password: string) => {
  const result = await query('SELECT * FROM users WHERE email = $1', [email]);
  
  if (result.rows.length === 0) {
    throw new Error('Invalid credentials');
  }

  const user = result.rows[0] as User;
  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  };
};

export const requireAuth = (context: any) => {
  if (!context.user) {
    throw new Error('Authentication required');
  }
  return context.user;
};

export const requireAdmin = (context: any) => {
  const user = requireAuth(context);
  if (user.role !== 'admin') {
    throw new Error('Admin access required');
  }
  return user;
};
