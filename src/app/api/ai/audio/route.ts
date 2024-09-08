// src/app/api/ai/audio/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { analyseAudio } from '@/lib/fx/audioAnalysis';
import { Readable } from 'stream';
import { ReadableStream as NodeReadableStream } from 'stream/web';

export const dynamic = 'force-dynamic'; // Configuration for dynamic routes

export async function POST(request: Request) {
  const tempFilePath = path.join(process.cwd(), 'temp_audio.mp3');
  const fileStream = fs.createWriteStream(tempFilePath);

  const streamPromise = new Promise<void>((resolve, reject) => {
    // @ts-ignore
    const readable = Readable.from(request.body as unknown as NodeReadableStream);

    readable.pipe(fileStream);

    readable.on('end', resolve);
    readable.on('error', reject);
  });

  try {
    await streamPromise;
    const text = await analyseAudio(tempFilePath);
    fs.unlinkSync(tempFilePath); // Remove the temporary file
    return NextResponse.json({ text });
  } catch (error) {
    fs.unlinkSync(tempFilePath); // Remove the temporary file
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message+"xx" }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unknown error occurred.' }, { status: 500 });
    }
  }
}
