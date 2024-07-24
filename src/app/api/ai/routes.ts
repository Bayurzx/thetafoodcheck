import { NextResponse } from 'next/server';
import { analyzeImage } from '@/lib/fx/imageAnalysis';

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get('image') as File;
  const health_data = formData.get('health_data') as string;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  try {
    const analysis = await analyzeImage(file, health_data);
    return NextResponse.json({ analysis });
  } catch (error) {
    console.error('Error analyzing image:', error);
    return NextResponse.json({ error: 'Error analyzing image' }, { status: 500 });
  }
}
