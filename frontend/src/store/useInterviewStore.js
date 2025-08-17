import { create } from "zustand";
import axios from "axios";

// Get API URL from environment variable or default to local
const API_BASE_URL = import.meta.env.VITE_AI_INTERVIEWER_BASE_URL || "http://localhost:5000";

const useInterviewStore = create((set, get) => ({
  // Shared state
  level: "",
  mode: "",
  selectedValue: "",
  currentQuestion: "",
  showInterview: false,
  isProcessing: false,
  evaluationResult: null,

  // Actions
  setLevel: (level) => set({ level }),
  setMode: (mode) => set({ mode }),
  setSelectedValue: (value) => set({ selectedValue: value }),
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setShowInterview: (show) => set({ showInterview: show }),

  // Generate Question from API
  generateQuestion: async () => {
    const { selectedValue, level, mode } = get();
    set({ isProcessing: true });

    try {
      const requestData = {
        level: level,
      };

      // Send based on mode
      if (mode === "role") {
        requestData.role = selectedValue;
      } else if (mode === "topic") {
        requestData.topic = selectedValue;
      }

      const res = await axios.post(
        `${API_BASE_URL}/api/generate-question`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      set({
        currentQuestion: res.data.question || "No question received",
        showInterview: true,
        isProcessing: false,
      });
    } catch (err) {
      console.error("Error generating question:", err);
      set({ 
        isProcessing: false,
        currentQuestion: "Error generating question. Please try again."
      });
    }
  },

  // Evaluate Answer from API
  evaluateAnswer: async (answer) => {
    const { currentQuestion, selectedValue, level, mode } = get();
    set({ isProcessing: true });

    try {
      const requestData = {
        question: currentQuestion,
        answer: answer,
        level: level,
      };

      if (mode === "role") {
        requestData.role = selectedValue;
      } else if (mode === "topic") {
        requestData.topic = selectedValue;
      }

      const res = await axios.post(
        `${API_BASE_URL}/api/evaluate-answer`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      set({
        evaluationResult: res.data,
        isProcessing: false,
      });

      return res.data;
    } catch (err) {
      console.error("Error evaluating answer:", err);
      set({ 
        isProcessing: false,
        evaluationResult: { feedback: "Error evaluating answer. Please try again." }
      });
      throw err;
    }
  },

  // Reset store
  resetStore: () =>
    set({
      level: "",
      mode: "",
      selectedValue: "",
      currentQuestion: "",
      showInterview: false,
      isProcessing: false,
      evaluationResult: null,
    }),
}));

export default useInterviewStore;