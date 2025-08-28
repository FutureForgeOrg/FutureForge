import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, RotateCcw, Volume2 } from 'lucide-react';
import useInterviewStore from '../../store/useInterviewStore';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import BackgroundWrapper from '../ui/BackgroundWrapper';
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
      <BackgroundWrapper>
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 shadow-xl p-8  mt-16 max-w-5xl mx-auto">
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 min-h-32 border-2 border-dashed border-blue-200 shadow-sm">
            {showInterview && currentQuestion ? (
              <div>
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm font-bold text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                    Question:
                  </span>
                  <button
                    onClick={speakQuestion}
                    className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-100 rounded-full transition-all duration-200"
                  >
                    <Volume2 size={18} />
                  </button>
                </div>
                <p className="text-gray-800 text-lg leading-relaxed font-medium">{currentQuestion}</p>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <span className="text-lg font-medium">Question will load here</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <textarea
            ref={textareaRef}
            value={userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full min-h-40 resize-none border-2 border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm text-gray-700 text-lg leading-relaxed"
          />
          <div className="flex justify-between items-center mt-4">
            <div className='flex items-center gap-3'>
              <button
                onClick={handleVoiceRecording}
                className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-md flex items-center gap-2 ${isRecording
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-200'
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
                  }`}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                {isRecording ? 'Stop' : 'Start'}
              </button>
              {isRecording && (
                <span className="text-gray-700 font-mono text-lg bg-gray-100 px-3 py-1 rounded-full">
                  {Math.floor(timeLeft / 60)
                    .toString()
                    .padStart(2, '0')}:
                  {(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 font-semibold transition-all duration-300 transform hover:scale-105 shadow-md"
              >
                Clear
              </button>
              <button
                onClick={handleSubmitAnswer}
                disabled={!userResponse.trim() || isProcessing}
                className="px-6 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl disabled:from-gray-300 disabled:to-gray-400 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
              >
                {isProcessing ? 'Evaluating...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 min-h-20 border-2 border-dashed border-green-200 shadow-sm">
            {feedback ? (
              <div>
                <span className="text-sm font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">Feedback:</span>
                <p className="text-gray-800 mt-3 text-lg leading-relaxed">{feedback}</p>
                {evaluationResult && evaluationResult.score && (
                  <div className="mt-4 bg-blue-100 rounded-lg p-3 inline-block">
                    <p className="text-blue-700 font-bold text-lg">
                      Score: <span className="text-blue-800">{evaluationResult.score}/{evaluationResult.max_score || 10}</span>
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <span className="text-gray-500 text-lg font-medium">Feedback will appear here</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-6">
          <button
            onClick={handleNextQuestion}
            disabled={!showInterview || isProcessing}
            className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl disabled:from-gray-300 disabled:to-gray-400 font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md"
          >
            {isProcessing ? 'Loading...' : 'Next Question'}
          </button>
          <button
            onClick={handleReset}
            className="px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl flex items-center space-x-2 font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg shadow-md hover:from-gray-200 hover:to-gray-300"
          >
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
        </div>
      </div>
      </BackgroundWrapper>
    </>
  );
}

export default InterviewPanel;