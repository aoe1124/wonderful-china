import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { kv } from '@vercel/kv';
import bcrypt from 'bcryptjs';

const handler = NextAuth({
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

        try {
          // 从 Vercel KV 获取用户数据
          const user = await kv.hgetall(`user:${credentials.username}`);
          
          if (!user || !user.password) {
            throw new Error('用户不存在');
          }

          // 验证密码
          const isValid = await bcrypt.compare(credentials.password, user.password as string);
          
          if (!isValid) {
            throw new Error('密码错误');
          }

          return {
            id: user.username as string,
            name: user.username as string,
            email: user.email as string,
          };
        } catch (error) {
          throw new Error('认证失败');
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24小时
  },
})

export { handler as GET, handler as POST } 