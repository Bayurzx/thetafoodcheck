import type { NextApiRequest, NextApiResponse } from 'next'
import { getHealthData } from '@/lib/db/healthDataCollection'

interface HealthDataResponse {
    healthData: any;  // Replace 'any' with your actual HealthData type
}

interface ErrorResponse {
    error: string;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<HealthDataResponse | ErrorResponse>) => {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET'])
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
    }

    const { userId } = req.query

    if (typeof userId !== 'string') {
        return res.status(400).json({ error: 'Invalid userId. Must be a string.' })
    }

    try {
        const { healthData, error } = await getHealthData(userId)

        if (error) {
            return res.status(500).json({ error })
        }

        if (!healthData) {
            return res.status(404).json({ error: 'Health data not found for the given userId.' })
        }

        return res.status(200).json({ healthData })
    } catch (error) {
        console.error('Error in health data API route:', error)
        return res.status(500).json({ error: 'An unexpected error occurred.' })
    }
}

export default handler