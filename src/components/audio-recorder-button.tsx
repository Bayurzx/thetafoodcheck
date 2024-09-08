'use client';

import React, { useState } from 'react';
import { useTheme } from '@/app/providers/theme';
import { notifyError } from '@/lib/utils/notifications';

const AudioRecorderButton: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState<string>('');
  const { theme } = useTheme();

  const startRecording = async () => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      notifyError('Audio recording is not supported in this browser.');
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    const audioChunks: Blob[] = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
      const formData = new FormData();
      formData.append('file', audioBlob);

      try {
        const response = await fetch('/api/ai/audio', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to process audio');
        }

        const data = await response.json();
        setAudioData(data.text);
      } catch (error) {
        if (error instanceof Error) {
          notifyError(error.message);
        } else {
          notifyError('An unknown error occurred.');
        }
      }
    };

    mediaRecorder.start();
    setIsRecording(true);

    setTimeout(() => {
      mediaRecorder.stop();
      setIsRecording(false);
    }, 50000); // Record for 5 seconds
  };

  return (
    <div>
      <button
        onClick={startRecording}
        className={`px-4 py-2 rounded ${isRecording ? 'bg-red-500' : 'bg-blue-500'} text-white`}
      >
        {isRecording ? 'Recording...' : 'Start Recording'}
      </button>
      {audioData && <p>Transcribed Text: {audioData}</p>}
    </div>
  );
};

export default AudioRecorderButton;
