import { NextApiRequest, NextApiResponse } from 'next';
import { updateOne } from '@/lib/db/userDataCollection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { collection, query, update } = req.body;

  if (typeof collection !== 'string' || typeof query !== 'object' || typeof update !== 'object') {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const result = await updateOne(collection, query, update);
    res.status(200).json({ success: result });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while updating the document' });
  }
}