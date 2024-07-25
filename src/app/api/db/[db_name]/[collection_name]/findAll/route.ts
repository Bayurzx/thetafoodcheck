import { NextRequest, NextResponse } from 'next/server';
import { findAll } from '@/lib/db/collection';

export async function GET(request: NextRequest, { params }: { params: { db_name: string; collection_name: string } }) {
  const { db_name, collection_name } = params;

  if (!db_name || !collection_name) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
  }

  try {
    const result = await findAll(db_name, collection_name);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred while fetching all documents' }, { status: 500 });
  }
}


// To use these routes in your application, you would make HTTP requests to the appropriate endpoints. For example:

// GET /api/db/findOne?collection=users&query={"_id":"123"}
// PUT /api/db/updateOne (with appropriate body)
// GET /api/db/find?collection=users&query={"age":{"$gt":18}}
// POST /api/db/insertMany (with appropriate body)
// GET /api/db/findAll?collection=users
