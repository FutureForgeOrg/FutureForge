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

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Speak Feedback
  const speakFeedback = (text) => {
    if ('speechSynthesis' in window && text) {
      // stop any previous speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };

      window.speechSynthesis.speak(utterance);
    }
  };

  // Pause / Resume Feedback
  const toggleSpeech = () => {
    if (!isSpeaking) return; // nothing playing
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  // Stop any ongoing speech when component unmounts
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel(); // cancel all queued/playing speech
      setIsSpeaking(false);
      setIsPaused(false);
    };
  }, []);


  // Update feedback when evaluationResult changes
  useEffect(() => {
    if (evaluationResult && evaluationResult.feedback) {
      setFeedback(evaluationResult.feedback);
      speakFeedback(evaluationResult.feedback);
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

  // stopping all voices when going to next question
  const handleNextQuestion = async () => {
    window.speechSynthesis.cancel(); // stop any ongoing speech

    setIsSpeaking(false);
    setIsPaused(false);

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
        <div className='pt-12 sm:pt-20 sm:pb-8'>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-5xl mx-auto shadow-xl border border-white/20">
            {/* Question Box */}
            <div className="mb-8">
              <div className="bg-white/20 rounded-xl p-6 min-h-32 border border-white/30 shadow-md">
                {showInterview && currentQuestion ? (
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <span className="text-xs font-semibold text-white bg-blue-600 px-3 py-1 rounded-full tracking-wide">
                        Question
                      </span>
                      <button
                        onClick={speakQuestion}
                        className="text-blue-200 hover:text-blue-100 p-2 hover:bg-white/10 rounded-full transition-all"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>
                    <p className="text-white text-lg leading-relaxed font-medium">
                      {currentQuestion}
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300">
                    <span className="text-lg font-medium">Question will load here</span>
                  </div>
                )}
              </div>
            </div>

            {/* Answer Box */}
            <div className="mb-6">
              <textarea
                ref={textareaRef}
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full min-h-40 resize-none bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4 text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleVoiceRecording}
                    className={`px-2 sm:px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${isRecording
                      ? 'bg-red-500/80 text-white hover:bg-red-600/90 shadow-red-500/30'
                      : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                  >
                    {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                    {isRecording ? 'Stop' : 'Start'}
                  </button>
                  {isRecording && (
                    <span className="text-white font-mono text-lg bg-black/30 px-3 py-1 rounded-full">
                      {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:
                      {(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                  )}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleClearAll}
                    className="px-2 sm:px-4 py-2 bg-white/20 text-white rounded-xl hover:bg-white/30 font-semibold transition-all"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={!userResponse.trim() || isProcessing}
                    className="px-2 sm:px-16 py-2 bg-green-500/80 hover:bg-green-600 text-white rounded-xl disabled:bg-gray-500/40 font-semibold transition-all"
                  >
                    {isProcessing ? 'Evaluating...' : 'Submit'}
                  </button>
                </div>
              </div>
            </div>

            {/* Feedback Box */}
            <div className="mb-8">
              <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 min-h-20 border border-white/30 shadow-md">
                {feedback ? (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-white bg-green-600 px-3 py-1 rounded-full tracking-wide">
                        Feedback
                      </span>

                      {isSpeaking && (
                        <button
                          onClick={toggleSpeech}
                          className="text-blue-200 hover:text-blue-100 px-3 py-1 rounded-full bg-white/10 transition-all text-sm"
                        >
                          {isPaused ? "Resume 🔊" : "Pause 🔇"}
                        </button>
                      )}
                    </div>

                    <p className="text-white mt-3 text-lg leading-relaxed">{feedback}</p>

                    {evaluationResult?.score && (
                      <div className="mt-4 bg-blue-600 rounded-lg p-3 inline-block">
                        <p className="text-white font-bold text-lg">
                          Score:{" "}
                          <span className="text-white">
                            {evaluationResult.score}/{evaluationResult.max_score || 10}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-gray-300 text-lg font-medium">
                      Feedback will appear here
                    </span>
                  </div>
                )}
              </div>

            </div>

            {/* Bottom Buttons */}
            <div className="flex space-x-6">
              <button
                onClick={handleNextQuestion}
                disabled={!showInterview || isProcessing}
                className="flex-1 py-[10px] bg-blue-600/80 hover:bg-blue-700 text-white rounded-xl disabled:bg-gray-500/40 font-bold text-md transition-all"
              >
                {isProcessing ? 'Loading...' : 'Next Question'}
              </button>
              <button
                onClick={handleReset}
                className="px-8 py-[10px] bg-white/20 text-white rounded-xl flex items-center space-x-2 font-semibold hover:bg-white/30 transition-all"
              >
                <RotateCcw size={18} />
                <span>Reset</span>
              </button>
            </div>
          </div>

        </ div>
      </BackgroundWrapper>
    </>
  );
}

export default InterviewPanel;