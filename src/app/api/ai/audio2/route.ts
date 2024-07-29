import { NextResponse } from 'next/server';
import { analyseAudio } from '@/lib/fx/audioAnalysis2';

export async function POST(request: Request) {
    console.log("AI request started!");

    try {
        const formData = await request.formData();
        const audioFile = formData.get('audio');

        if (!audioFile || !(audioFile instanceof Blob)) {
            return NextResponse.json({ error: 'Audio file is required' }, { status: 400 });
        }

        const analysisResult = await analyseAudio(audioFile);
        return NextResponse.json(analysisResult, { status: 200 });
    } catch (error) {
        console.error('Error processing audio:', error);
        return NextResponse.json({ error: 'Failed to analyze audio' }, { status: 500 });
    }
}
