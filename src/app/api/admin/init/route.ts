import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import bcrypt from 'bcryptjs';

// 添加 GET 方法支持
export async function GET() {
  try {
    // 检查是否已经初始化
    const isInitialized = await kv.exists('system:initialized');
    if (isInitialized) {
      return new Response(
        '系统已经初始化，默认管理员账户已存在。',
        { status: 400 }
      );
    }

    // 创建默认管理员账户
    const defaultAdmin = {
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      email: 'admin@wonderchina.org',
      role: 'admin',
      createTime: Date.now(),
    };

    // 存储管理员信息
    await kv.hset(`user:${defaultAdmin.username}`, defaultAdmin);
    
    // 标记系统已初始化
    await kv.set('system:initialized', '1');

    return new Response(
      '管理员账户初始化成功！\n\n' +
      '现在你可以使用以下信息登录：\n' +
      '- 用户名：admin\n' +
      '- 密码：admin123\n\n' +
      '请立即登录并修改密码！',
      { status: 200 }
    );
  } catch (error) {
    console.error('初始化管理员账户失败:', error);
    return new Response(
      '初始化失败：' + (error as Error).message,
      { status: 500 }
    );
  }
}

// 保持原有的 POST 方法
export async function POST() {
  return GET();
} 