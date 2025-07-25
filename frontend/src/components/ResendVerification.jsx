import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthStore } from '../store/useAuthStore';

const ResendVerification = () => {

    const { tempEmail } = useAuthStore();

    const [email, setEmail] = useState(tempEmail || '');
    const [cooldown, setCooldown] = useState(0);
    const [loading, setLoading] = useState(false);

    // countdown timer
    useEffect(() => {
        let interval;
        if (cooldown > 0) {
            interval = setInterval(() => setCooldown(prev => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [cooldown]);

    const handleResend = async () => {
        setLoading(true);
        try {
            const { data } = await axiosInstance.post('/auth/resend-verification-email', { email });
            toast.success(data.message || 'Verification email sent.');
            setCooldown(60); // start cooldown
        } catch (err) {
            const msg = err?.response?.data?.message || 'Something went wrong';
            toast.error(msg);

            // as error contains cooldown seconds, extract it
            const match = msg.match(/wait (\d+) seconds/);
            if (match) {
                const seconds = parseInt(match[1], 10);
                setCooldown(seconds);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 mt-6">
            <input
                type="email"
                placeholder="Enter your email"
                className="border px-4 py-2 rounded w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                onClick={handleResend}
                disabled={loading || cooldown > 0 || !email}
                className={`px-6 py-2 rounded text-white ${cooldown > 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                    }`}
            >
                {cooldown > 0 ? `Resend available in ${cooldown}s` : loading ? 'Sending...' : 'Resend Email'}
            </button>
        </div>
    );
};

export default ResendVerification;
