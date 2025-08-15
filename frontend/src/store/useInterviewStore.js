import { create } from "zustand";

const useInterviewStore = create((set, get) => ({
  // Shared state
  level: "",
  mode: "",
  selectedValue: "",
  currentQuestion: "",
  showInterview: false,
  isProcessing: false,

  // Mock questions database
  questionDatabase: {
    "python-beginner": [
      "What is Python and why is it popular?",
      "Explain the difference between a list and a tuple in Python.",
      "What is the purpose of indentation in Python?"
    ],
    "javascript-intermediate": [
      "Explain closures in JavaScript with an example.",
      "What is the difference between synchronous and asynchronous JavaScript?",
      "How do you handle errors in JavaScript?"
    ],
    "system design-advanced": [
      "How would you design a URL shortening service like bit.ly?",
      "Explain how you would design a chat application for millions of users.",
      "How would you design a distributed cache system?"
    ],
    "backend developer-intermediate": [
      "How do you ensure data consistency in a distributed system?",
      "Explain the difference between REST and GraphQL APIs.",
      "How would you handle authentication and authorization in a microservices architecture?"
    ],
    "data scientist-advanced": [
      "Explain the bias-variance tradeoff in machine learning.",
      "How would you handle missing data in a large dataset?",
      "What is the difference between supervised and unsupervised learning?"
    ]
  },

  // Actions
  setLevel: (level) => set({ level }),
  setMode: (mode) => set({ mode }),
  setSelectedValue: (value) => set({ selectedValue: value }),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setShowInterview: (show) => set({ showInterview: show }),

  generateQuestion: () => {
    const { selectedValue, level, questionDatabase } = get();
    set({ isProcessing: true });

    setTimeout(() => {
      const key = `${selectedValue}-${level}`.toLowerCase();
      const questions = questionDatabase[key] || [
        "Tell me about your experience with this technology.",
        "How would you approach solving a complex problem in this domain?",
        "What are some best practices you follow in this area?",
        "Describe a challenging project you've worked on recently.",
        "How do you stay updated with the latest trends in your field?"
      ];

      const question = questions[Math.floor(Math.random() * questions.length)];
      set({
        currentQuestion: question,
        showInterview: true,
        isProcessing: false
      });
    }, 1500);
  },

  resetStore: () =>
    set({
      level: "",
      mode: "",
      selectedValue: "",
      currentQuestion: "",
      showInterview: false,
      isProcessing: false
    })
}));

export default useInterviewStore;
