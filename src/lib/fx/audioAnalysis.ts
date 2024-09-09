import fs from 'fs';
import OpenAI from 'openai';

const openai = new OpenAI();

export const analyseAudio = async (filePath: string): Promise<string> => {
  try {
    // Ensure the file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Attempt transcription
    const transcription = await openai.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: 'whisper-1',
      response_format: 'text',
    });

    // Verify transcription response
    if (!transcription || !transcription.text) {
      throw new Error('Transcription failed or returned empty text.');
    }

    // Extract health data
    const healthData = await getHealthDataFromText(transcription.text);
    return healthData;

  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in analyseAudio: ${error.message}`);
      throw new Error(`Audio analysis failed: ${error.message}`);
    } else {
      console.error('Unknown error occurred in analyseAudio.');
      throw new Error('An unknown error occurred in audio analysis.');
    }
  }
};

const getHealthDataFromText = async (text: string): Promise<string> => {
  try {
    // Ensure the text is not empty
    if (!text || text.trim().length === 0) {
      throw new Error('Empty transcription text provided.');
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'Extract health data from the following text.' },
        { role: 'user', content: text },
      ],
    });

    // Ensure the response is valid
    if (!response || !response.choices || response.choices.length === 0) {
      throw new Error('Invalid response from OpenAI chat API.');
    }

    return response.choices[0].message.content || 'No analysis available.';
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error in getHealthDataFromText: ${error.message}`);
      throw new Error(`Failed to extract health data: ${error.message}`);
    } else {
      console.error('Unknown error occurred in getHealthDataFromText.');
      throw new Error('An unknown error occurred in health data extraction.');
    }
  }
};
