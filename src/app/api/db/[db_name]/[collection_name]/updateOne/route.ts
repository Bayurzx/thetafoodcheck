import { NextRequest, NextResponse } from 'next/server';
import { updateOne } from '@/lib/db/collection';

export async function PUT(request: NextRequest, { params }: { params: { db_name: string; collection_name: string } }) {
  const { db_name, collection_name } = params;
  const body = await request.json();
  const { query, update } = body;

  if (!db_name || !collection_name || typeof query !== 'object' || typeof update !== 'object') {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  try {
    const result = await updateOne(db_name, collection_name, query, update);
    return NextResponse.json({ success: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while updating the document' }, { status: 500 });
  }
}
