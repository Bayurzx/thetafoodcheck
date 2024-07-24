import { NextApiRequest, NextApiResponse } from 'next';
import { findOne } from '@/lib/db/userDataCollection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { collection, dbQuery } = req.query;

  if (typeof collection !== 'string' || typeof dbQuery !== 'string') {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const result = await findOne(collection, JSON.parse(decodeURIComponent(dbQuery)));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the document' });
  }
}