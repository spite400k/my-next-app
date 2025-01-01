import React, { useState, useEffect } from 'react';

const VoiceInput: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ブラウザがWeb Speech APIをサポートしているか確認
    if (!('webkitSpeechRecognition' in window)) {
      setError('このブラウザは音声認識をサポートしていません。Chromeをお試しください。');
    }
  }, []);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) return;

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'ja-JP'; // 日本語設定
    recognition.interimResults = false; // 確定結果のみ取得
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const result = event.results[0][0].transcript;
      setTranscript(result);
      setIsListening(false);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setError(`エラー: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div>
      <button onClick={startListening} disabled={isListening}>
        {isListening ? '認識中...' : '音声入力を開始'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>音声入力結果: {transcript}</p>
    </div>
  );
};

export default VoiceInput;
