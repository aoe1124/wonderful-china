import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const STORAGE_KEY = 'wonderchina_categories';

// 从本地存储获取分类
const getCategories = () => {
  if (typeof window === 'undefined') return [];
  const savedCategories = localStorage.getItem(STORAGE_KEY);
  return savedCategories ? JSON.parse(savedCategories) : [];
};

// 保存分类到本地存储
const saveCategories = (categories: any[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
};

// 获取分类列表
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: '未授权访问' }, { status: 401 });
  }

  const categories = getCategories();
  return NextResponse.json(categories);
}

// 创建新分类
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: '未授权访问' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const categories = getCategories();
    
    const newCategory = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
      order: categories.length,
      createTime: Date.now(),
    };

    categories.push(newCategory);
    saveCategories(categories);
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('创建分类失败:', error);
    return NextResponse.json(
      { error: '创建分类失败' },
      { status: 500 }
    );
  }
}

// 更新分类
export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: '未授权访问' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const categories = getCategories();
    const index = categories.findIndex(c => c.id === data.id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: '分类不存在' },
        { status: 404 }
      );
    }

    categories[index] = { ...categories[index], ...data };
    saveCategories(categories);
    
    return NextResponse.json(categories[index]);
  } catch (error) {
    console.error('更新分类失败:', error);
    return NextResponse.json(
      { error: '更新分类失败' },
      { status: 500 }
    );
  }
}

// 删除分类
export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: '未授权访问' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: '缺少分类ID' },
        { status: 400 }
      );
    }

    const categories = getCategories();
    const index = categories.findIndex(c => c.id === id);
    
    if (index === -1) {
      return NextResponse.json(
        { error: '分类不存在' },
        { status: 404 }
      );
    }

    categories.splice(index, 1);
    // 更新剩余分类的顺序
    const updatedCategories = categories.map((c, i) => ({ ...c, order: i }));
    saveCategories(updatedCategories);
    
    return NextResponse.json({ message: '删除成功' });
  } catch (error) {
    console.error('删除分类失败:', error);
    return NextResponse.json(
      { error: '删除分类失败' },
      { status: 500 }
    );
  }
} 