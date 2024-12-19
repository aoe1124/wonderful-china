import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { kv } from '@vercel/kv';
import bcrypt from 'bcryptjs';

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "用户名", type: "text" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('请输入用户名和密码');
        }

        // 从 KV 存储获取用户信息
        const user = await kv.hgetall(`user:${credentials.username}`);
        
        if (!user) {
          throw new Error('用户不存在');
        }

        // 验证密码
        const isValid = await bcrypt.compare(credentials.password, user.password);
        
        if (!isValid) {
          throw new Error('密码错误');
        }

        return {
          id: user.username,
          name: user.username,
          email: user.email,
          role: user.role,
        };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
      }
      return session;
    }
  }
}; 