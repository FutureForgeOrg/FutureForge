import { useState } from 'react';
import Navbar from '../components/Navbar';
import WelcomeCard from '../components/Dashboard/WelcomeCard';
import Cards from '../components/Dashboard/Cards';
import PortfolioCard from '../components/Dashboard/PortfolioCard';
import ResumeCard from '../components/Dashboard/ResumeCard';

export default function Dashboard() {
  const [profileCompletion, setProfileCompletion] = useState(30); // Example completion percentage

  return (
    <>
      <Navbar />

      <div className="min-h-screen mt-16 bg-gradient-to-br from-slate-900 to-indigo-900 p-6" style={{ background: 'linear-gradient(to bottom right, #1e293b, #7c3aed)' }}>
        <div className="max-w-6xl mx-auto">
          {/* Welcome Header */}
          <WelcomeCard userName="Prince Patel" />

          {/* Cards Grid */}
          <Cards profileCompletion={profileCompletion} />
          <PortfolioCard/>
          <ResumeCard/>
        </div>
      </div>
    </>
  );
}