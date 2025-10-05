import { User, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useProfileStore from '../../store/useProfileStore';
import { useProfileCompletion } from '../../hooks/useProfile';
import { useEffect } from 'react';

export default function Cards() {
  const { profileCompletion: completion, setProfileCompletion } = useProfileStore();
  const profileCompletion = completion;
  const navigate = useNavigate();

  const { data: completionData} = useProfileCompletion();
  
    useEffect(() => {
      if (completionData?.completion !== undefined) {
        setProfileCompletion(completionData.completion);
      }
    }, [completionData, setProfileCompletion]);

  const getProfileStatus = () => {
    if (profileCompletion >= 100) {
      return {
        title: "Profile Completed 🎉",
        subtitle: "Your profile is fully set up and ready to shine!",
        bgColor: "#d1fae5", // emerald-100
        iconColor: "#10b981", // emerald-500
        showProgress: false,
      };
    } else {
      return {
        title: "Complete Your Profile",
        subtitle: `${profileCompletion}% complete — Unlock full potential by adding details.`,
        bgColor: "#fef3c7", // amber-100
        iconColor: "#f59e0b", // amber-500
        showProgress: true,
      };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 my-10">
      {/* Profile Setup Card */}
      <div
        onClick={() => navigate('/Profile')}
        className="rounded-3xl shadow-2xl p-6 md:p-8 border border-white/10 
                   bg-gradient-to-br from-[#1f1f2f]/70 to-[#1a1a2a]/70 
                   backdrop-blur-md transition-transform duration-700 
                   hover:scale-105 hover:shadow-amber-500/30 cursor-pointer"
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center w-14 h-14 rounded-xl mb-5 transition-all duration-500"
          style={{ backgroundColor: getProfileStatus().bgColor }}
        >
          <User className="w-7 h-7" style={{ color: getProfileStatus().iconColor }} />
        </div>

        {/* Title + Subtitle */}
        <h3 className="text-xl font-bold text-white mb-2">
          {getProfileStatus().title}
        </h3>
        <p className="text-sm text-gray-200 mb-4">{getProfileStatus().subtitle}</p>

        {/* Progress Bar */}
        {getProfileStatus().showProgress && (
          <div>
            <div className="w-full bg-gray-300 rounded-full h-2 mb-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs">
              <span className="font-medium text-amber-400">
                {profileCompletion}% Complete
              </span>
              <span className="text-gray-300">
                {100 - profileCompletion}% Remaining
              </span>
            </div>
          </div>
        )}

        {/* Completed Badge */}
        {!getProfileStatus().showProgress && (
          <div className="flex items-center justify-center mt-3 py-2 px-4 bg-emerald-100 rounded-lg">
            <span className="text-sm font-semibold text-emerald-700">
              ✓ All Set — You’re ready to go!
            </span>
          </div>
        )}
      </div>

      {/* Quick Job Search Card */}
      <div
        onClick={() => navigate('/jobSearch')}
        className="rounded-3xl shadow-2xl p-6 md:p-8 border border-white/10 
                   bg-gradient-to-br from-[#1f1f2f]/80 to-[#1a1a2a]/80 
                   backdrop-blur-md transition-transform duration-700 
                   hover:scale-105 hover:shadow-purple-500/40 cursor-pointer"
      >
        {/* Icon */}
        <div
          className="flex items-center justify-center w-14 h-14 rounded-xl mb-5 
                     bg-gradient-to-br from-purple-400 to-purple-600"
        >
          <Briefcase className="w-7 h-7 text-white" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 tracking-wide">
          Land Your Next Big Tech Role ⚡
        </h3>

        {/* Subtitle */}
        <p className="text-[18px] text-base text-gray-200 leading-relaxed">
          Explore <span className="text-purple-400 font-semibold">the hottest jobs in tech </span> 
          curated for your skills — and apply <span className="font-medium text-white">instantly </span> with one click.  
          <br />
          <span className="text-green-400 font-semibold">
            Stop searching. Start growing your career 🚀
          </span>
        </p>
      </div>
    </div>
  );
}
