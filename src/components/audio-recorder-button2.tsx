import React, { useState, useRef } from 'react';

const AudioRecorderButton2: React.FC = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [analysisData, setAnalysisData] = useState<any>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const handleStartRecording = () => {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                const mediaRecorder = new MediaRecorder(stream);
                mediaRecorderRef.current = mediaRecorder;

                const audioChunks: Blob[] = [];
                mediaRecorder.ondataavailable = event => {
                    audioChunks.push(event.data);
                };

                mediaRecorder.onstop = async () => {
                    const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                    setAudioBlob(audioBlob);
                    await handleAudioSubmit(audioBlob);
                };

                mediaRecorder.start();
                setIsRecording(true);
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
            });
    };

    const handleStopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    };

    const handleAudioSubmit = async (audioBlob: Blob) => {
        const formData = new FormData();
        formData.append('audio', audioBlob);

        try {
            const response = await fetch('/api/ai/audio', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                setAnalysisData(data);
            } else {
                console.error('Failed to process audio');
            }
        } catch (error) {
            console.error('Error processing audio:', error);
        }
    };

    return (
        <div>
            <button
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            {analysisData && (
                <div>
                    <h3>Analysis Data:</h3>
                    <pre>{JSON.stringify(analysisData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default AudioRecorderButton2;
