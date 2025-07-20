// import { useState } from 'react';
// import Navbar from '../components/Navbar';
// import WelcomeCard from '../components/Dashboard/WelcomeCard';
// import Cards from '../components/Dashboard/Cards';
// import PortfolioCard from '../components/Dashboard/PortfolioCard';
// import ResumeCard from '../components/Dashboard/ResumeCard';
// import GridBackground from '../components/ui/GridBackground';
// import BackgroundWrapper from '../components/ui/BackgroundWrapper';
// export default function Dashboard() {
//   const [profileCompletion, setProfileCompletion] = useState(30); // Example completion percentage

//   return (
//     <>
//       <Navbar />
//        <BackgroundWrapper>
//         <div className='mt-16 p-6'>
//       {/* <div className="min-h-screen mt-16 bg-gradient-to-br from-slate-900 to-indigo-900 p-6" style={{ background: 'linear-gradient(to bottom right, #1e293b, #7c3aed)' }}> */}
//         <div className="max-w-6xl mx-auto">
//           {/* Welcome Header */}
//           <WelcomeCard userName="Prince Patel" />

//           {/* Cards Grid */}
//           <Cards profileCompletion={profileCompletion} />
//           <PortfolioCard/>
//           <ResumeCard/>
//         </div>
//       {/* </div> */}
//       </div>
//       </BackgroundWrapper>
//     </>
//   );
// }

import { useState, lazy, Suspense } from 'react';
import Navbar from '../components/Navbar';
import BackgroundWrapper from '../components/ui/BackgroundWrapper';
import {Loader} from '../components/ui/Loader'; 

// Lazy load components
const WelcomeCard = lazy(() => import('../components/Dashboard/WelcomeCard'));
const Cards = lazy(() => import('../components/Dashboard/Cards'));
const PortfolioCard = lazy(() => import('../components/Dashboard/PortfolioCard'));
const ResumeCard = lazy(() => import('../components/Dashboard/ResumeCard'));

export default function Dashboard() {
  const [profileCompletion, setProfileCompletion] = useState(30);

  return (
    <>
      <Navbar />
      <BackgroundWrapper>
        <div className='pt-16 p-6'>
          <div className='mt-6'>
            <div className="max-w-6xl mx-auto">
              <Suspense fallback={<Loader />}> 
                <WelcomeCard userName="Prince Patel" />
                <Cards profileCompletion={profileCompletion} />
                <PortfolioCard />
                <ResumeCard />
              </Suspense>
            </div>
          </div>
        </div>
      </BackgroundWrapper>
    </>
  );
}
