import { NextRequest, NextResponse } from 'next/server';
import { insertOne } from '@/lib/db/collection';

export async function POST(request: NextRequest, { params }: { params: { db_name: string; collection_name: string } }) {
  const { db_name, collection_name } = params;
  const body = await request.json();

  if (!db_name || !collection_name || !body.document) {
    return NextResponse.json({ error: 'Missing db_name, collection_name, or document in request body' }, { status: 400 });
  }

  try {
    const insertedId = await insertOne(db_name, collection_name, body.document);
    return NextResponse.json({ insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error in insertOne API:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
