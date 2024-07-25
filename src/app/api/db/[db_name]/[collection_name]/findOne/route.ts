import { NextRequest, NextResponse } from 'next/server';
import { findOne } from '@/lib/db/collection';

export async function GET(request: NextRequest, { params }: { params: { db_name: string; collection_name: string } }) {
  const { db_name, collection_name } = params;
  const searchParams = new URL(request.url).searchParams;
  const dbQuery = searchParams.get('dbQuery');

  if (!db_name || !collection_name || !dbQuery) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  try {
    const result = await findOne(db_name, collection_name, JSON.parse(decodeURIComponent(dbQuery)));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching the document' }, { status: 500 });
  }
}
