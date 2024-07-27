import { NextRequest, NextResponse } from 'next/server';
import { insertMany } from '@/lib/db/collection';

export async function POST(request: NextRequest, { params }: { params: { db_name: string; collection_name: string } }) {
  const { db_name, collection_name } = params;
  const body = await request.json();

  if (!db_name || !collection_name || !Array.isArray(body.documents)) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  try {
    const result = await insertMany(db_name, collection_name, body.documents);
    return NextResponse.json({ insertedIds: result }, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);

    return NextResponse.json({ error: 'An error occurred while inserting the documents' }, { status: 500 });
  }
}
