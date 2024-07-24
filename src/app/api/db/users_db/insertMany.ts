import { NextApiRequest, NextApiResponse } from 'next';
import { insertMany } from '@/lib/db/userDataCollection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { collection, documents } = req.body;

  if (typeof collection !== 'string' || !Array.isArray(documents)) {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const result = await insertMany(collection, documents);
    res.status(201).json({ insertedIds: result });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while inserting the documents' });
  }
}