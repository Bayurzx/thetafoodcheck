import { ImageAnnotatorClient } from '@google-cloud/vision';
import { OpenAI } from 'openai';

const keyFileContent = process.env.KEY_FILE_BASE64;
if (!keyFileContent) {
  throw new Error('The KEY_FILE_BASE64 environment variable is not set.');
}

const credential = JSON.parse(Buffer.from(keyFileContent, 'base64').toString());


const visionClient = new ImageAnnotatorClient({
  projectId: credential.project_id,
  credentials: {
    client_email: credential.client_email,
    private_key: credential.private_key,
  },
});

const openai = new OpenAI();

export async function analyzeImage(file: File, health_data: string): Promise<string> {
  // Convert file to base64
  const buffer = await file.arrayBuffer();
  const base64Image = Buffer.from(buffer).toString('base64');

  // Perform OCR using Google Cloud Vision
  const [result] = await visionClient.textDetection({ image: { content: base64Image } });
  const extractedText = result.fullTextAnnotation?.text || '';

  // Analyze text using ChatGPT
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: 'system', content: 'You are a helpful nutrition expert designed to output JSON. You only return with any or all of this: warnings, advice, suggestions, recommendations, ingredients and food_facts as keys' },
      { role: 'user', content: `Write warnings, advice, suggestions , recommendations, ingredients and/or food_facts for the patient about the content of the consumables: ${extractedText} ### based on this health data: ${JSON.stringify(health_data)}` }
    ],
  });

  console.log(completion.choices[0].message.content);
  return completion.choices[0].message.content || 'No analysis available.';
}
