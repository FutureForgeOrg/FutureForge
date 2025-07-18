import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import useBookmarkStore from '../store/useBookmarkStore';

const fetchBookmarks = async ({ queryKey }) => {
    const [_key, { page, limit, keyword }] = queryKey;

    const { data } = await axiosInstance.get('/bookmarks', {
        params: {
            page,
            limit,
            keyword
        }
    });

    return data;
}

const useBookmarksQuery = () => {
    const { page, limit, keyword } = useBookmarkStore(); // from zustand

    return useQuery({
        queryKey: ['bookmarks', { page, limit, keyword }],
        queryFn: fetchBookmarks,
        keepPreviousData: true,
        select: (data) => ({
            bookmarks: data.bookmarks,
            total: data.total,
        }),

    });
};

export default useBookmarksQuery;


// {
//   "success": true,
//   "total": 3,
//   "page": 1,
//   "limit": 10,
//   "bookmarks": [
//     {
//       "_id": "687a83a651f0dddcb2a8ea68",
//       "job": {
//         "_id": "6870a6218d67693e8186a83d",
//         "company_name": "tawk.to",
//         "job_title": "Senior Back End Developer- Remote: Full Time",
//         "location": "Anywhere",
//         "job_link": "https://www.google.com/search?q=eyJqb2JfdGl0bGUiOiJTZW5pb3IgQmFjayBFbmQgRGV2ZWxvcGVyLSBSZW1vdGU6IEZ1bGwgVGltZSIsImNvbXBhbnlfbmFtZSI6InRhd2sudG8iLCJodGlkb2NpZCI6IlY2WUs0el9nODQya2laM2RBQUFBQUE9PSIsInV1bGUiOiJ3K0NBSVFJQ0lGU1c1a2FXRSJ9&ibp=htl;jobs",
//         "direct_link": "",
//         "google_link": "https://www.google.com/search?q=eyJqb2JfdGl0bGUiOiJTZW5pb3IgQmFjayBFbmQgRGV2ZWxvcGVyLSBSZW1vdGU6IEZ1bGwgVGltZSIsImNvbXBhbnlfbmFtZSI6InRhd2sudG8iLCJodGlkb2NpZCI6IlY2WUs0el9nODQya2laM2RBQUFBQUE9PSIsInV1bGUiOiJ3K0NBSVFJQ0lGU1c1a2FXRSJ9&ibp=htl;jobs",
//         "link_type": "google",
//         "scraped_date": "2025-07-17T04:18:20.619Z",
//         "description": "tawk.to, the world’s #1 business messaging application is expanding its engineering team and is seeking an experienced Backend Developer, with research and data analysis skills, to help shape the future of business communications.\n\nEvery day we get to build an array of awesome systems at scale, including search, concurrency, content organization, real-time metrics, deployment, and event-driven, low-latency, concurrent apps. Our current systems are mostly built on Node.js.\n\nWe focus on fast, iter",
//         "job_id": "6afea9f62e09fa7b"
//       },
//       "createdAt": "2025-07-18T17:25:59.248Z"
//     },
//     {
//       "_id": "6879fbfd33f224e8752ff70f",
//       "job": {
//         "_id": "6870a6218d67693e8186a83c",
//         "company_name": "Central Data Storage
//           ....