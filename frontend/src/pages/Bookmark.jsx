import useBookmarksQuery from '../hooks/useBookmarksQuery.js';
import useBookmarkStore from '../store/useBookmarkStore.js';
import Pagination from '../components/JobSearch/Pagination.jsx';
import JobCard from '../components/JobSearch/JobCard.jsx';
import GridBackground from '../components/ui/GridBackground.jsx';
import Navbar from '../components/Navbar.jsx';
import { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce.js';
import BackgroundWrapper from '../components/ui/BackgroundWrapper.jsx';
import { Search } from 'lucide-react';

const Bookmark = () => {
  const { page, limit, setPage, keyword, setKeyword } = useBookmarkStore();

  const { data, isLoading, isError } = useBookmarksQuery();

  const [localKeyword, setLocalKeyword] = useState(keyword);
  const debouncedKeyword = useDebounce(localKeyword, 600);

  useEffect(() => {
    setKeyword('keyword', debouncedKeyword);
    setPage(1);
  }, [debouncedKeyword]);


  return (
    <section>
      <Navbar />
      <BackgroundWrapper>
        <div className='p-6 max-w-4xl mx-auto py-14'>
          <div className='mt-6'>
            <div className="grid grid-cols-1">
              <h1 className="text-3xl text-white font-bold text-center mb-6 mt-2">
                Bookmarked Jobs
              </h1>

              <div className='mb-6 relative'>
                <div className='absolute top-1/2 left-3 -translate-y-1/2 w-5 h-5 text-white/50'>
                  <Search size={18} className='text-white' />
                </div>
                <input
                  type="text"
                  placeholder="Keyword (e.g. remote, React)"
                  value={localKeyword}
                  onChange={(e) => setLocalKeyword(e.target.value)}
                  className="p-2 pl-9 rounded w-full text-white border bg-black"
                />
              </div>

              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="animate-pulse space-y-2 p-4 border border-gray-200 rounded-lg">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                ))

              ) : isError ? (
                <p className="text-center text-red-400">Something went wrong.</p>

              ) : !data || data.bookmarks.length === 0 ? (
                <p>No bookmarks yet.</p>

              ) : (
                data.bookmarks?.map((bookmark) => (
                  <JobCard key={bookmark._id} job={bookmark.job} />
                ))
              )}

            </div>

            <div className="mt-6">
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(data?.total / limit)}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </BackgroundWrapper>
    </section>

  );
};

export default Bookmark;
