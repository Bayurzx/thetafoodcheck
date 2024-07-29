import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';
import os from 'os';
import FormData from 'form-data';

const openai = new OpenAI();

export async function analyseAudio(audioBlob: Blob): Promise<any> {
    // Convert Blob to a Buffer
    const audioBuffer = Buffer.from(await audioBlob.arrayBuffer());
    
    // Save Buffer to a temporary file
    const tempDir = os.tmpdir();
    const tempFilePath = path.join(tempDir, 'temp-audio.wav');
    fs.writeFileSync(tempFilePath, audioBuffer);

    // Create form-data object
    const form = new FormData();
    form.append('file', fs.createReadStream(tempFilePath));
    form.append('model', 'whisper-1');
    form.append('response_format', 'text');

    // Transcription request
    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(tempFilePath),
        model: 'whisper-1',
        response_format: 'text',
    });

    // Delete the temporary file
    fs.unlinkSync(tempFilePath);

    const transcriptionText = transcription.text;

    // Further processing to extract specific health data from the transcription
    // For demonstration purposes, let's assume we extract some health data
    const healthData = extractHealthData(transcriptionText);

    return healthData;
}

function extractHealthData(text: string): any {
    // Implement your logic to extract specific health data from the transcription text
    return {
        extractedData: text, // Replace with actual extracted data
    };
}
