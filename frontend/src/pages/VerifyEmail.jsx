import React from 'react';
import ResendVerification from '../components/ResendVerification';

const VerifyEmailPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-purple-800">
      <div className="bg-white  rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to your email address. Please check your inbox and click the link to verify your account.
        </p>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 " />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white  px-2 text-gray-500">OR</span>
          </div>
        </div>
        <ResendVerification />
      </div>
    </div>
  );
};

export default VerifyEmailPage;
