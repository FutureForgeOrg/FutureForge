import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const EmailVerificationHandler = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { verifyEmailToken } = useAuthStore();
  const hasVerified = useRef(false); // prevent double call as in development it can be called twice till second time it gets -> record is deleted from db

  useEffect(() => {
    if (token && !hasVerified.current) {
      hasVerified.current = true;
      verifyEmailToken(token, navigate);
    }
  }, [token, verifyEmailToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-lg">Verifying email...</p>
    </div>
  );
};

export default EmailVerificationHandler;
