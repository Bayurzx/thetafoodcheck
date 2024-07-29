// src/lib/fx/audioAnalysis.ts
import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI();

export const analyseAudio = async (filePath: string): Promise<string> => {
  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filePath),
    model: 'whisper-1',
    response_format: 'text',
  });

  const healthData = await getHealthDataFromText(transcription.text);

  return healthData;
};

const getHealthDataFromText = async (text: string): Promise<string> => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: 'system', content: 'Extract health data from the following text.' },
      { role: 'user', content: text },
    ],
  });

  return response.choices[0].message.content || 'No analysis available.';
};
