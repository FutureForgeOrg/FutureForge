import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, RotateCcw, Volume2 } from 'lucide-react';
import useInterviewStore from '../../store/useInterviewStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';

function InterviewPanel() {
  const {
    currentQuestion,
    showInterview,
    generateQuestion,
    resetStore,
    evaluationResult,
    evaluateAnswer,
    isProcessing
  } = useInterviewStore();

  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef(null);
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const recognitionRef = useRef(null);

  // Update feedback when evaluationResult changes
  useEffect(() => {
    if (evaluationResult && evaluationResult.feedback) {
      setFeedback(evaluationResult.feedback);
    }
  }, [evaluationResult]);

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

        setTimeLeft(120);
        timerRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current);
              stopRecording();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        alert('Speech recognition not supported in this browser.');
      }
    } else {
      stopRecording();
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    setTimeLeft(0);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  };

  const handleSubmitAnswer = async () => {
    if (!userResponse.trim()) return;
    try {
      await evaluateAnswer(userResponse);
    } catch (error) {
      setFeedback("Error evaluating answer. Please try again.");
    }
  };

  const handleNextQuestion = async () => {
    setUserResponse('');
    setFeedback('');
    await generateQuestion();
  };

  const handleReset = () => {
    setUserResponse('');
    setFeedback('');
    setIsRecording(false);
    stopRecording();
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
            <div className='flex items-center gap-2'>
              <button
                onClick={handleVoiceRecording}
                className={`px-3 py-2 rounded-lg ${isRecording
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700'
                  }`}
              >
                {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
                {isRecording ? ' Stop' : ' Start'}
              </button>
              {isRecording && (
                <span className="ml-2 text-gray-700">
                  {Math.floor(timeLeft / 60)
                    .toString()
                    .padStart(2, '0')}:
                  {(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              )}
            </div>
            <div>
              <button
                onClick={handleClearAll}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg mr-2"
              >
                Clear
              </button>
              <button
                onClick={handleSubmitAnswer}
                disabled={!userResponse.trim() || isProcessing}
                className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-300"
              >
                {isProcessing ? 'Evaluating...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4 min-h-16 border-2 border-dashed border-gray-200">
            {feedback ? (
              <div>
                <span className="text-sm font-medium text-gray-600">Feedback:</span>
                <p className="text-gray-800 mt-1">{feedback}</p>
                {evaluationResult && evaluationResult.score && (
                  <p className="text-sm text-blue-600 mt-2">
                    Score: {evaluationResult.score}/{evaluationResult.max_score || 10}
                  </p>
                )}
              </div>
            ) : (
              <span className="text-gray-400">Feedback area</span>
            )}
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={handleNextQuestion}
            disabled={!showInterview || isProcessing}
            className="flex-1 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-300"
          >
            {isProcessing ? 'Loading...' : 'Next Question'}
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