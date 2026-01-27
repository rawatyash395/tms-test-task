import { Context } from '../types';
import { authenticateUser, generateToken, requireAuth, requireAdmin } from '../auth';
import { query } from '../db/connection';

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, context: Context) => {
      const user = requireAuth(context);
      
      const result = await query(
        'SELECT id, email, name, role, created_at FROM users WHERE id = $1',
        [user.id]
      );

      return result.rows[0];
    },
  },

  Mutation: {
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await authenticateUser(email, password);
      const token = generateToken(user);

      return {
        token,
        user,
      };
    },
  },
};
