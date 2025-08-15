import React, { useState, useRef } from 'react';
import { Mic, MicOff, RotateCcw, Volume2 } from 'lucide-react';
import useInterviewStore from '../../store/useInterviewStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

function InterviewPanel() {
  const {
    currentQuestion,
    showInterview,
    setCurrentQuestion,
    setShowInterview,
    generateQuestion,
    resetStore
  } = useInterviewStore();

  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [autoStopTimer, setAutoStopTimer] = useState(null);

  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);
  // const handleVoiceRecording = () => {
  //   if (!isRecording) {
  //     setIsRecording(true);
  //     const timer = setTimeout(() => {
  //       setIsRecording(false);
  //       setAutoStopTimer(null);
  //     }, 120000);
  //     setAutoStopTimer(timer);
  //   } else {
  //     setIsRecording(false);
  //     if (autoStopTimer) {
  //       clearTimeout(autoStopTimer);
  //       setAutoStopTimer(null);
  //     }
  //   }
  // };

  const handleVoiceRecording = () => {
  if (!isRecording) {
    // Start recording
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = function (event) {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setUserResponse((prev) => prev + ' ' + finalTranscript);
        }
      };

      recognitionRef.current.onerror = function (event) {
        console.error('Speech recognition error:', event.error);
        stopRecording();
      };

      recognitionRef.current.onend = function () {
        if (isRecording) {
          stopRecording();
        }
      };

      recognitionRef.current.start();
      setIsRecording(true);

      // Auto stop after 2 minutes
      const timer = setTimeout(() => {
        stopRecording();
      }, 120000);
      setAutoStopTimer(timer);
    } else {
      alert('Speech recognition not supported in this browser.');
    }
  } else {
    // Stop recording manually
    stopRecording();
  }
};

const stopRecording = () => {
  setIsRecording(false);
  if (autoStopTimer) {
    clearTimeout(autoStopTimer);
    setAutoStopTimer(null);
  }
  if (recognitionRef.current) {
    recognitionRef.current.stop();
    recognitionRef.current = null;
  }
};
  const handleSubmitAnswer = () => {
    if (!userResponse.trim()) return;
    const score = Math.min(
      10,
      Math.max(
        1,
        Math.floor(userResponse.trim().length / 50) +
          Math.floor(Math.random() * 3) +
          5
      )
    );

    const feedbackMessages = [
      `Score: ${score}/10. Good technical understanding demonstrated.`,
      `Score: ${score}/10. Consider adding more specific examples in your response.`,
      `Score: ${score}/10. Excellent explanation with clear structure.`,
      `Score: ${score}/10. Try to elaborate more on practical applications.`,
      `Score: ${score}/10. Strong answer showing depth of knowledge.`
    ];

    setFeedback(
      feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)]
    );
  };

  const handleNextQuestion = () => {
    setUserResponse('');
    setFeedback('');
    generateQuestion();
  };

  const handleReset = () => {
    setUserResponse('');
    setFeedback('');
    setIsRecording(false);
    resetStore();
    navigate('/tools/Interview');
  };

  const handleClearAll = () => setUserResponse('');

  const speakQuestion = () => {
    if ('speechSynthesis' in window && currentQuestion) {
      const utterance = new SpeechSynthesisUtterance(currentQuestion);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white rounded-lg border-2 border-gray-200 p-8 mt-16">
        <div className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4 min-h-24 border-2 border-dashed border-gray-200">
            {showInterview && currentQuestion ? (
              <div>
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question:
                  </span>
                  <button
                    onClick={speakQuestion}
                    className="text-blue-600 hover:text-blue-700 p-1"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
                <p className="text-gray-800">{currentQuestion}</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <span>Question will load here</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-4">
          <textarea
            ref={textareaRef}
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Answer area here"
            className="w-full min-h-32 resize-none border border-gray-300 rounded-lg p-3"
          />
          <div className="flex justify-between mt-2">
            <button
              onClick={handleVoiceRecording}
              className={`px-3 py-2 rounded-lg ${
                isRecording
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
              {isRecording ? ' Stop' : ' Start'}
            </button>
            <div>
              <button
                onClick={handleClearAll}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg mr-2"
              >
                Clear
              </button>
              <button
                onClick={handleSubmitAnswer}
                disabled={!userResponse.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4 min-h-16 border-2 border-dashed border-gray-200">
            {feedback ? (
              <p>{feedback}</p>
            ) : (
              <span className="text-gray-400">Feedback area</span>
            )}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleNextQuestion}
            disabled={!showInterview}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg"
          >
            Next
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg flex items-center space-x-2"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default InterviewPanel;
