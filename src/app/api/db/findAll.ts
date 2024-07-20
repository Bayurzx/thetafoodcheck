import { NextApiRequest, NextApiResponse } from 'next';
import { findAll } from '@/lib/db/healthDataCollection';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { collection } = req.query;

  if (typeof collection !== 'string') {
    return res.status(400).json({ error: 'Invalid parameters' });
  }

  try {
    const result = await findAll(collection);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching all documents' });
  }
}


// To use these routes in your application, you would make HTTP requests to the appropriate endpoints. For example:

// GET /api/db/findOne?collection=users&query={"_id":"123"}
// PUT /api/db/updateOne (with appropriate body)
// GET /api/db/find?collection=users&query={"age":{"$gt":18}}
// POST /api/db/insertMany (with appropriate body)
// GET /api/db/findAll?collection=users
