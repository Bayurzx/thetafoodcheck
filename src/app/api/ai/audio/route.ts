
import fs from 'fs';
import path from 'path';
import ffmpeg from 'fluent-ffmpeg';
import { analyseAudio } from '@/lib/fx/audioAnalysis';
import { NextResponse } from 'next/server';
import { Readable } from 'stream';


export const dynamic = 'force-dynamic'; // Configuration for dynamic routes

export async function POST(request: Request) {
  const tempFilePath = path.join(process.cwd(), 'temp_audio.mp3');
  const convertedFilePath = path.join(process.cwd(), 'converted_audio.wav');
  const fileStream = fs.createWriteStream(tempFilePath);

  const streamPromise = new Promise<void>((resolve, reject) => {
    try {
      // @ts-ignore
      const readable = Readable.from(request.body as unknown as NodeReadableStream);

      readable.pipe(fileStream);

      readable.on('end', resolve);
      readable.on('error', (error: Error) => {
        console.error(`Error piping audio stream: ${error.message}`);
        reject(new Error('Failed to pipe the audio stream.'));
      });
    } catch (error) {
      reject(new Error(`Failed to handle request body stream: ${error instanceof Error ? error.message : 'Unknown error'}`));
    }
  });

  try {
    await streamPromise;

    // Convert the audio to a supported format (WAV in this case)
    await new Promise<void>((resolve, reject) => {
      ffmpeg(tempFilePath)
        .toFormat('wav')
        .on('end', () => resolve())
        .on('error', (error: Error) => {
          console.error(`Error converting audio: ${error.message}`);
          reject(new Error('Failed to convert audio to WAV format.'));
        })
        .save(convertedFilePath);

    });

    const text = await analyseAudio(convertedFilePath);

    // Cleanup: Remove the temp files
    // fs.unlinkSync(tempFilePath);
    // fs.unlinkSync(convertedFilePath);

    return NextResponse.json({ text });

  } catch (error) {
    // Cleanup: Remove the temp files if they exist
    if (fs.existsSync(tempFilePath)) fs.unlinkSync(tempFilePath);
    if (fs.existsSync(convertedFilePath)) fs.unlinkSync(convertedFilePath);

    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    console.error(`Error in POST /api/ai/audio: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
