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
    try {
      // @ts-ignore
      const readable = Readable.from(request.body as unknown as NodeReadableStream);

      readable.pipe(fileStream);

      readable.on('end', resolve);
      readable.on('error', (error) => {
        
        console.error(`Error piping audio stream: ${error.message}`);
        reject(new Error('Failed to pipe the audio stream.'));
      });
    } catch (error) {
      reject(new Error(`Failed to handle request body stream: ${error instanceof Error ? error.message : 'Unknown error'}`));
    }
  });

  try {
    await streamPromise;
    
    // Ensure the stream wrote the file properly
    if (!fs.existsSync(tempFilePath)) {
      throw new Error(`Failed to write audio file at ${tempFilePath}`);
    }

    const text = await analyseAudio(tempFilePath);
    fs.unlinkSync(tempFilePath); // Remove the temporary file

    return NextResponse.json({ text });

  } catch (error) {
    // Cleanup the temp file if it exists
    if (fs.existsSync(tempFilePath)) {
      fs.unlinkSync(tempFilePath);
    }

    // Handle and log the error
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    console.error(`Error in POST /api/ai/audio: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
