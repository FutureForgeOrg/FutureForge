import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Clock,
  Code,
  Database,
  Brackets,
  Layers,
  Calculator,
  Shuffle,
  ChevronLeft,
  CheckCircle,
  XCircle,
  RotateCcw,
  Home
} from 'lucide-react';
import { questionBank } from '../../utils/questionBank';
import Navbar from '../../components/Navbar';
import BackgroundWrapper from '../../components/ui/BackgroundWrapper';

const Quiz = () => {
  const categories = [
    {
      id: 'dsa',
      name: 'Data Structures & Algorithms',
      icon: Code,
      description: 'Test your knowledge of algorithms, data structures, and computational complexity',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500/20'
    },
    {
      id: 'sql',
      name: 'SQL Database',
      icon: Database,
      description: 'Challenge yourself with database queries, normalization, and SQL concepts',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/20'
    },
    {
      id: 'js',
      name: 'JavaScript',
      icon: Brackets,
      description: 'Master JavaScript fundamentals, ES6+, and advanced concepts',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-yellow-500/20'
    },
    {
      id: 'reactjs',
      name: 'ReactJS',
      icon: Layers,
      description: 'Dive deep into React hooks, lifecycle methods, and component patterns',
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'bg-cyan-500/20'
    },
    {
      id: 'mathsAptitude',
      name: 'Math Aptitude',
      icon: Calculator,
      description: 'Solve numerical problems, percentages, ratios, and logical reasoning',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/20'
    },
    {
      id: 'OsAndCn',
      name: 'Os & Computer Networks',
      icon: Code,
      description: 'Understand operating systems, networking protocols, and system architecture',
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-500/20'
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [answers, setAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showCategorySelection, setShowCategorySelection] = useState(true);

  // Timer
  useEffect(() => {
    let timer;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setQuizCompleted(true);
            setShowResult(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeLeft]);

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const shuffleArray = array => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const selectCategory = categoryId => {
    setSelectedCategory(categoryId);
    setShowCategorySelection(false);
  };

  const startQuiz = () => {
    if (!selectedCategory) return;
    const categoryQuestions = questionBank[selectedCategory] || [];
    const shuffled = shuffleArray(categoryQuestions);
    const selected = shuffled.slice(0, Math.min(15, shuffled.length));
    setCurrentQuestions(selected);
    setQuizStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(900);
    setAnswers([]);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = answerIndex => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQuestions[currentQuestionIndex].correct;
    if (isCorrect) setScore(score + 1);
    const newAnswer = {
      questionId: currentQuestions[currentQuestionIndex].id,
      selected: answerIndex,
      correct: currentQuestions[currentQuestionIndex].correct,
      isCorrect
    };
    setAnswers([...answers, newAnswer]);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setTimeLeft(900);
    setAnswers([]);
    setQuizCompleted(false);
    setSelectedCategory(null);
    setShowCategorySelection(true);
  };

  const backToCategories = () => {
    setSelectedCategory(null);
    setShowCategorySelection(true);
  };

  const getScoreColor = () => {
    const percentage = (score / currentQuestions.length) * 100;
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreMessage = () => {
    const percentage = (score / currentQuestions.length) * 100;
    if (percentage >= 90) return 'Outstanding! You\'re a master! ';
    if (percentage >= 80) return 'Excellent work! ';
    if (percentage >= 70) return 'Good job! ';
    if (percentage >= 60) return 'Not bad, keep studying! ';
    return 'Keep learning and try again! ';
  };

  // ---------------- SCREENS ---------------- //

  return (
    <>
      <Navbar />
      <BackgroundWrapper>
        <div className="w-[95%] sm:w-[90%] md:max-w-4xl mx-auto pt-20 md:pt-24 pb-2">

          {/* --- CATEGORY SELECTION --- */}
          {showCategorySelection && (
            <div>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white mb-4">Quiz Challenge</h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                  Choose your category and test your knowledge with 15 randomly selected hardcore questions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(category => {
                  const IconComponent = category.icon;
                  return (
                    <div
                      key={category.id}
                      onClick={() => selectCategory(category.id)}
                      className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 cursor-pointer transform hover:scale-105 transition-all duration-300 hover:bg-white/20"
                    >
                      <div className={`w-16 h-16 ${category.bgColor} rounded-2xl flex items-center justify-center mb-4`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                      <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                      <div className={`inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r ${category.color} text-white text-sm font-semibold`}>
                        <Shuffle className="w-4 h-4 mr-2" />
                        Start Quiz
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center mt-12">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 max-w-md mx-auto">
                  <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="text-lg font-semibold text-white mb-2">Quiz Info</h3>
                  <div className="text-gray-300 text-sm space-y-1">
                    <p>15 Questions per category</p>
                    <p>15 minutes time limit</p>
                    <p>Hardcore difficulty level</p>
                    <p>Questions randomly shuffled</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* --- CATEGORY SELECTED, PRE-QUIZ --- */}
          {selectedCategory && !quizStarted && (
            <>
              <button
                onClick={backToCategories}
                className="mb-6 flex items-center text-white hover:text-yellow-400 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back to Categories
              </button>

              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 text-center">
                <div className={`w-20 h-20 ${categories.find(cat => cat.id === selectedCategory).bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  {React.createElement(categories.find(cat => cat.id === selectedCategory).icon, { className: "w-10 h-10 text-white" })}
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">{categories.find(cat => cat.id === selectedCategory).name}</h2>
                <p className="text-gray-300 mb-8">{categories.find(cat => cat.id === selectedCategory).description}</p>

                <div className="bg-white/5 rounded-xl p-6 mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">Quiz Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                    <div>
                      <div className="font-semibold">Questions</div>
                      <div>15 random questions</div>
                    </div>
                    <div>
                      <div className="font-semibold">Time Limit</div>
                      <div>15 minutes</div>
                    </div>
                    <div>
                      <div className="font-semibold">Scoring</div>
                      <div>1 point per correct answer</div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={startQuiz}
                  className={`w-full py-4 px-8 rounded-xl bg-gradient-to-r ${categories.find(cat => cat.id === selectedCategory).color} text-white font-semibold text-lg hover:opacity-90 transition-opacity`}
                >
                  Start Quiz Challenge
                </button>
              </div>
            </>
          )}

          {/* --- QUIZ IN PROGRESS --- */}
          {quizStarted && currentQuestions.length > 0 && !showResult && (
            <>
              {/* Header */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 mb-4 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white font-semibold">
                    Question {currentQuestionIndex + 1} of {currentQuestions.length}
                  </div>
                  <div className="flex items-center text-yellow-400">
                    <Clock className="w-5 h-5 mr-2" />
                    <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-8 leading-relaxed">{currentQuestions[currentQuestionIndex].question}</h2>
                <div className="space-y-4">
                  {currentQuestions[currentQuestionIndex].options.map((option, index) => {
                    let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ";
                    if (selectedAnswer === null) {
                      buttonClass += "border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40";
                    } else if (index === currentQuestions[currentQuestionIndex].correct) {
                      buttonClass += "border-green-500 bg-green-500/20 text-green-100";
                    } else if (index === selectedAnswer && index !== currentQuestions[currentQuestionIndex].correct) {
                      buttonClass += "border-red-500 bg-red-500/20 text-red-100";
                    } else {
                      buttonClass += "border-white/10 bg-white/5 text-gray-400";
                    }
                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(index)}
                        className={buttonClass}
                        disabled={selectedAnswer !== null}
                      >
                        <div className="flex items-center">
                          <div className="size-6 md:size-8 rounded-full border-2 border-current flex items-center justify-center mr-4 text-sm font-semibold">
                            {String.fromCharCode(65 + index)}
                          </div>
                          <div className="flex-1">{option}</div>
                          {selectedAnswer !== null && index === currentQuestions[currentQuestionIndex].correct && (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          )}
                          {selectedAnswer !== null && index === selectedAnswer && index !== currentQuestions[currentQuestionIndex].correct && (
                            <XCircle className="w-6 h-6 text-red-500" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <div className="text-gray-300 mt-2">
                  Score: <span className="text-white font-semibold">{score}/{currentQuestionIndex + (selectedAnswer !== null ? 1 : 0)}</span>
                </div>
                {selectedAnswer !== null && (
                  <button
                    onClick={nextQuestion}
                    className="py-2 px-6 mt-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-semibold hover:opacity-90 transition-opacity"
                  >
                    {currentQuestionIndex < currentQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                )}
              </div>
            </>
          )}

          {/* --- QUIZ RESULTS --- */}
          {showResult && (
            <>
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-6 md:p-8 border border-white/20">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Quiz Completed!</h2>
                  <p className="text-gray-300 text-sm sm:text-base">{categories.find(cat => cat.id === selectedCategory).name}</p>
                </div>

                <div className="bg-white/5 rounded-xl p-4 sm:p-6 mb-8">
                  <div className="text-center mb-6">
                    <div className={`text-4xl sm:text-5xl md:text-6xl font-bold ${getScoreColor()} mb-2`}>
                      {score}/{currentQuestions.length}
                    </div>
                    <div className="text-lg sm:text-2xl text-gray-300 mb-2">{Math.round((score / currentQuestions.length) * 100)}%</div>
                    <div className="text-sm sm:text-lg text-yellow-400">{getScoreMessage()}</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                      <div className="text-xl sm:text-2xl font-bold text-green-400">{score}</div>
                      <div className="text-sm text-gray-300">Correct</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                      <div className="text-xl sm:text-2xl font-bold text-red-400">{currentQuestions.length - score}</div>
                      <div className="text-sm text-gray-300">Incorrect</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                      <div className="text-xl sm:text-2xl font-bold text-blue-400">{formatTime(900 - timeLeft)}</div>
                      <div className="text-sm text-gray-300">Time Used</div>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">Review Your Answers</h3>
                  <div className="space-y-4 max-h-80 sm:max-h-96 overflow-y-auto pr-2">
                    {answers.map((answer, index) => {
                      const question = currentQuestions[index];
                      return (
                        <div key={index} className="bg-white/5 rounded-lg p-3 sm:p-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2">
                            <div className="text-white font-medium text-sm sm:text-base">
                              Q{index + 1}: {question.question}
                            </div>
                            {answer.isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-400 mt-1 sm:mt-0" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400 mt-1 sm:mt-0" />
                            )}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-300">
                            <div className={`${answer.isCorrect ? 'text-green-400' : 'text-red-400'} mb-1`}>
                              Your answer: {question.options[answer.selected]}
                            </div>
                            {!answer.isCorrect && (
                              <div className="text-green-400 mb-1">
                                Correct answer: {question.options[answer.correct]}
                              </div>
                            )}
                            {question.explanation && (
                              <div className="text-gray-400 text-[10px] sm:text-xs mt-2 italic">
                                {question.explanation}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={resetQuiz}
                    className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center text-sm sm:text-base"
                  >
                    <Home className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Back to Home
                  </button>

                  <button
                    onClick={startQuiz}
                    className="flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:opacity-90 transition-opacity flex items-center justify-center text-sm sm:text-base"
                  >
                    <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Retry Quiz
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </BackgroundWrapper>
    </>
  );
};

export default Quiz;
