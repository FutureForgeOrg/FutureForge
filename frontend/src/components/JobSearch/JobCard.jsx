import { FaRegBookmark } from "react-icons/fa";
import {  FaBookmark } from "react-icons/fa";
import { getPostedAgoText } from '../../utils/dateHelpers.js';
import { useAddBookmark, useDeleteBookmark } from '../../hooks/useBookmarkMutations';
import useBookmarksQuery from '../../hooks/useBookmarksQuery';
import { useEffect, useState } from 'react';

const JobCard = ({ job }) => {
  const postedAgo = getPostedAgoText(job.scraped_date);
  const { data } = useBookmarksQuery();
  const bookmarks = data?.bookmarks;

  const addBookmark = useAddBookmark();
  const deleteBookmark = useDeleteBookmark();

  const bookmarked = bookmarks?.find(b => b.job?._id === job._id);
  const [isBookmarked, setIsBookmarked] = useState(!!bookmarked);

  useEffect(() => {
    setIsBookmarked(!!bookmarked);
  }, [bookmarked]);

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      deleteBookmark.mutate(bookmarked._id);
    } else {
      addBookmark.mutate(job._id);
    }
  };

  return (
    <div
      className="relative rounded-2xl p-6 mb-6 border border-white/10 bg-[#1f1f2f]/80 text-white shadow-lg transition-all"
      style={{
        backfaceVisibility: 'hidden',
        willChange: 'transform',
        transform: 'translateZ(0)'
      }}
    >
      <h3 className="text-xl font-semibold mb-2">{job.company_name || 'Not specified'}</h3>
      <p className="text-sm md:text-md mb-1">Job Title: {job.job_title || 'Not specified'}</p>
      <p className="text-sm md:text-md mb-1">Location: {job.location || 'Not specified'}</p>
      {job.description && (
        <p className="text-sm mb-2">{job.description}</p>
      )}
      <span className="text-sm text-green-400">{postedAgo}</span>

      <div className="flex flex-wrap gap-3 mt-4">
        {job.job_link && (
          <a
            href={job.job_link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            Apply Now
          </a>
        )}

        {job.direct_link && job.direct_link !== job.job_link && (
          <a
            href={job.direct_link}
            target="_blank"
            rel="noopener noreferrer"
            className="border px-3 py-1 rounded hover:bg-white/10 transition"
          >
            Backup Link 1
          </a>
        )}

        {job.google_link && job.google_link !== job.job_link && job.google_link !== job.direct_link && (
          <a
            href={job.google_link}
            target="_blank"
            rel="noopener noreferrer"
            className="border px-3 py-1 rounded hover:bg-white/10 transition"
          >
            Backup Link 2
          </a>
        )}
      </div>

      <div className="absolute top-3 right-3">
        <button
          onClick={handleBookmarkToggle}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
        >
          {isBookmarked ? <FaBookmark className="text-black" /> : <FaRegBookmark className="text-black" />}
        </button>
      </div>
    </div>
  );
};

export default JobCard;
