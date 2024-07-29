// src/app/api/ai/audio/route.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';
import { analyseAudio } from '@/lib/fx/audioAnalysis';

const openai = new OpenAI();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const tempFilePath = path.join(process.cwd(), 'temp_audio.mp3');
  const fileStream = fs.createWriteStream(tempFilePath);

  req.pipe(fileStream);

  fileStream.on('finish', async () => {
    try {
      const text = await analyseAudio(tempFilePath);
      fs.unlinkSync(tempFilePath); // Remove the temporary file

      res.status(200).json({ text });
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  });

  fileStream.on('error', (error) => {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred.' });
    }
  });
}
