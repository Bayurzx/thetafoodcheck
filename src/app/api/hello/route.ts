import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // Get the name from query parameters
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  const greeting = name ? `Hello, ${name}!` : 'Hello, World!';

  return NextResponse.json({ message: greeting });
}

