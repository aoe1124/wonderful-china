import { NextResponse } from 'next/server';
import { getCategories, setCategories } from '@/lib/kv';
import { Category } from '@/types';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
  } catch (err) {
    console.error('获取分类失败:', err);
    return NextResponse.json({ error: '获取分类失败' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newCategory: Category = await request.json();
    const categories = await getCategories();
    
    // 设置新分类的顺序
    newCategory.order = categories.length;
    
    // 添加新分类
    const updatedCategories = [...categories, newCategory];
    await setCategories(updatedCategories);
    
    return NextResponse.json(newCategory);
  } catch (err) {
    console.error('添加分类失败:', err);
    return NextResponse.json({ error: '添加分类失败' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedCategory: Category = await request.json();
    const categories = await getCategories();
    
    // 更新分类
    const updatedCategories = categories.map(category => 
      category.id === updatedCategory.id ? updatedCategory : category
    );
    
    await setCategories(updatedCategories);
    return NextResponse.json(updatedCategory);
  } catch (err) {
    console.error('更新分类失败:', err);
    return NextResponse.json({ error: '更新分类失败' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const categories = await getCategories();
    
    // 删除分类
    const updatedCategories = categories.filter(category => category.id !== id);
    
    // 重新排序
    const reorderedCategories = updatedCategories.map((category, index) => ({
      ...category,
      order: index
    }));
    
    await setCategories(reorderedCategories);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('删除分类失败:', err);
    return NextResponse.json({ error: '删除分类失败' }, { status: 500 });
  }
} 