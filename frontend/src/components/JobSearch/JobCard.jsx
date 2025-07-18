// import bookmark from '../../assets/bookmark.png';
import { FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";

import { getPostedAgoText } from '../../utils/dateHelpers.js'

import { useAddBookmark, useDeleteBookmark } from '../../hooks/useBookmarkMutations';
import useBookmarksQuery from '../../hooks/useBookmarksQuery';
import { useEffect, useState } from 'react';

const JobCard = ({ job }) => {

  const postedAgo = getPostedAgoText(job.scraped_date);

    //   {
    //   bookmarks: [...], // array
    //   total: number
    //   }

  const { data } = useBookmarksQuery();
  const bookmarks = data?.bookmarks;

  const addBookmark = useAddBookmark();
  const deleteBookmark = useDeleteBookmark();

  // finding if this job is already bookmarked
  const bookmarked = bookmarks?.find(b => b.job?._id === job._id);
  const [isBookmarked, setIsBookmarked] = useState(!!bookmarked); // with !! ensuring that isBookmarked is a clean true or false boolean — not a truthy or falsy value like undefined, null, or {}

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
    <div className="rounded-3xl shadow-2xl p-4 md:p-8 mb-8 border border-white/10 bg-gradient-to-br from-[#1f1f2f]/60 to-[#1a1a2a]/60 backdrop-blur-md transform transition-all duration-1000 hover:from-transparent hover:to-transparent">
      <h3 className="text-xl font-semibold mb-2">{job.company_name || 'Not specified'}</h3>
      <p className="text-sm md:text-md text-white mb-2">Job Title: {job.job_title || 'Not specified'}</p>
      <p className="text-sm md:text-md text-white mb-2">Location: {job.location || 'Not specified'}</p>
      {job.description && <p className="text-sm text-white mb-2">{job.description || 'Not specified'}</p>}
      <span className="text-sm text-green-400 whitespace-nowrap">{postedAgo}</span>

      <div className="flex gap-3 mt-3">
        {job.job_link && (
          <a
            href={job.job_link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Apply Now
          </a>
        )}

        {job.direct_link && job.direct_link !== job.job_link && (
          <a
            href={job.direct_link}
            target="_blank"
            rel="noopener noreferrer"
            className="border px-3 py-1 rounded"
          >
            Backup Link 1
          </a>
        )}

        {job.google_link && job.google_link !== job.job_link && job.google_link !== job.direct_link && (
          <a
            href={job.google_link}
            target="_blank"
            rel="noopener noreferrer"
            className="border px-3 py-1 rounded text-sm"
          >
            Backup Link 2
          </a>
        )}
      </div>


      <div className="absolute top-2 right-2">
        <button
          onClick={handleBookmarkToggle}
          className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
        >
          {isBookmarked ? <FaBookmark className="text-black"/> : <FaRegBookmark className="text-black"/>}

        </button>
      </div>
    </div>
  );
};

export default JobCard;
