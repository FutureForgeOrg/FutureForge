import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import Register from "../pages/Register";
const Terms = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const handleRedirect = () => {
    setTimeout(() => {
      navigate("/register");
    }, 500); // 500ms delay
  };

  return (
    // <div onClick={handleRedirect}
    //   className="p-6 max-w-20xl mx-auto bg-white text-black cursor-pointer min-h-screen"
    //   title="Click anywhere to go back"
    // >
    <div className="min-h-screen flex items-center justify-center p-10 md:p-4">
      <div className="p-8 max-w-3xl mx-auto bg-white text-gray-800 border border-purple-400 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-purple-700 border-b-2 border-pink-500 pb-2">
          FutureForge – Terms & Conditions
        </h1>

        <p className="mb-6 text-slate-900 text-lg">
          By using FutureForge, you agree to the terms below:
        </p>

        <ol className="list-decimal space-y-6 pl-6 text-gray-800">
          <li className="border-l-4 border-blue-500 pl-4">
            <strong className="text-indigo-900">Use of Services:</strong> We help you find jobs, build resumes, and explore tools using APIs. Job listings shown are from external websites. We redirect you; we don't host or own these listings.
          </li>
          <li className="border-l-4 border-blue-500 pl-4">
            <strong className="text-indigo-900">No Data Misuse:</strong> We don't store job content or misuse company data. We show public data and links with respect to original platforms.
          </li>
          <li className="border-l-4 border-blue-500 pl-4">
            <strong className="text-indigo-900">User Agreement:</strong> You agree to use the platform ethically and provide correct information.
          </li>
          <li className="border-l-4 border-blue-500 pl-4">
            <strong className="text-indigo-900">Legal & Compliance:</strong> We follow API usage rules and respect third-party rights. If any platform wants content removed, we will do so immediately.
          </li>
        </ol>

        <div className="mt-8 p-4 bg-gray-50 border border-yellow-400 rounded">
          <p className="text-slate-900">
            By registering, you agree to these terms. Contact us at{" "}
            <a
              href="mailto:contact.futureforge@gmail.com"
              className="text-purple-700 underline font-semibold hover:bg-pink-500 hover:text-white px-1 transition-colors duration-200"
            >
              contact.futureforge@gmail.com
            </a>{" "}
            for any concerns.
          </p>
        </div>
        {from === "Register" &&
          <button
            onClick={() => navigate("/register")}
            className="mt-8 px-6 py-3 bg-purple-700 text-white font-semibold rounded border-2 border-purple-700 hover:bg-blue-200 hover:text-indigo-900 hover:border-blue-500 transition-colors duration-200"
          >
            Back to Sign Up
          </button>
        }
        {from === "LandingPage" &&
          <button
            onClick={() => navigate("/")}
            className="mt-8 px-6 py-3 bg-purple-700 text-white font-semibold rounded border-2 border-purple-700 hover:bg-blue-200 hover:text-indigo-900 hover:border-blue-500 transition-colors duration-200"
          >
            Back to Home
          </button>
        }
      </div>
    </div>
  );
};

export default Terms;