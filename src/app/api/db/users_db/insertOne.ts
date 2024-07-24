// src/app/api/db/insertOne.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { insertOne } from '@/lib/db/userDataCollection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { collectionName, document } = req.body;

    if (!collectionName || !document) {
      return res.status(400).json({ error: 'Missing collectionName or document in request body' });
    }

    const insertedId = await insertOne(collectionName, document);

    return res.status(201).json({ insertedId });
  } catch (error) {
    console.error('Error in insertOne API:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}