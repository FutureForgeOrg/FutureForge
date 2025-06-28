import { useState } from 'react';
import { User, Briefcase, FileText, StickyNote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cards({ profileCompletion = 30 }) {
  const [note, setNote] = useState('');
  const navigate = useNavigate();

  const handleNoteChange = (e) => {
    if (e.target.value.length <= 200) {
      setNote(e.target.value);
    }
  };

  const getProfileStatus = () => {
    if (profileCompletion >= 100) {
      return {
        title: "Profile Completed! ",
        subtitle: "Your profile is fully set up",
        bgColor: "#d1fae5", // emerald-100
        iconColor: "#10b981", // emerald-500
        showProgress: false
      };
    } else {
      return {
        title: "Complete Your Profile",
        subtitle: `${profileCompletion}% completed - Add more details`,
        bgColor: "#fef3c7", // amber-100
        iconColor: "#f59e0b", // amber-500
        showProgress: true
      };
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-6">
      {/* Profile Setup Card */}
      <div onClick={() => navigate('/Profile')} className="rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group" style={{ backgroundColor: 'white', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-all duration-300" style={{ backgroundColor: getProfileStatus().bgColor }}>
          <User className="w-6 h-6" style={{ color: getProfileStatus().iconColor }} />
        </div>
        <h3 className="text-base sm:text-lg font-semibold mb-2" style={{ color: '#1e293b' }}>
          {getProfileStatus().title}
        </h3>
        <p className="text-sm mb-3" style={{ color: '#475569' }}>
          {getProfileStatus().subtitle}
        </p>

        {/* Progress Bar */}
        {getProfileStatus().showProgress && (
          <div className="w-full">
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium" style={{ color: '#f59e0b' }}>
                {profileCompletion}% Complete
              </span>
              <span className="text-xs" style={{ color: '#64748b' }}>
                {100 - profileCompletion}% remaining
              </span>
            </div>
          </div>
        )}

        {/* Completed Badge */}
        {!getProfileStatus().showProgress && (
          <div className="flex items-center justify-center w-full py-2 px-4 bg-emerald-100 rounded-lg">
            <span className="text-sm font-medium text-emerald-700">
              ✓ All Set!
            </span>
          </div>
        )}
      </div>

      {/* Quick Job Search Card */}
      <div onClick={() => navigate('/JobSearch')} className="rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group" style={{ backgroundColor: 'white', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-all duration-300" style={{ backgroundColor: '#c084fc' }}>
          <Briefcase className="w-6 h-6" style={{ color: '#7c3aed' }} />
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: '#1e293b' }}>
         Speed up your job search 
        </h3>
        <p className="text-sm" style={{ color: '#475569' }}>
           take a quick match survey
        </p>
      </div>

      {/* Professional Journey Card */}
      <div className="rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group" style={{ backgroundColor: 'white', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4 transition-all duration-300" style={{ backgroundColor: '#06b6d4' }}>
          <FileText className="w-6 h-6" style={{ color: '#ffffff' }} />
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: '#1e293b' }}>
         “Build your resume, portfolio & unlock career tools”
</h3>
        <p className="text-sm" style={{ color: '#475569' }}>
         “Access expert resources and templates” 
        </p>
      </div>

      {/* Notes Card */}
      <div className="rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300" style={{ backgroundColor: 'white', backdropFilter: 'blur(10px)' }}>
        <div className="flex items-center justify-center w-12 h-12 rounded-lg mb-4" style={{ backgroundColor: '#f97316' }}>
          <StickyNote className="w-6 h-6" style={{ color: '#ffffff' }} />
        </div>
        <h3 className="text-lg font-semibold mb-3" style={{ color: '#1e293b' }}>
          Quick Notes
        </h3>
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Write your thoughts, reminders, or ideas here..."
          className="w-full h-24 p-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 transition-all duration-300"
          style={{
            borderColor: '#e5e7eb',
            backgroundColor: '#ffffff',
            color: '#1e293b',
            focusRingColor: '#f97316'
          }}
          onFocus={(e) => e.target.style.boxShadow = '0 0 0 2px #f97316'}
          onBlur={(e) => e.target.style.boxShadow = 'none'}
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs" style={{ color: '#475569' }}>
            {note.length}/200 characters
          </span>
          {note.length > 180 && (
            <span className="text-xs" style={{ color: '#f97316' }}>
              Almost full!
            </span>
          )}
        </div>
      </div>
    </div>
  );
}