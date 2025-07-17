import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios'
import useJobFilters from '../store/useJobFilters'

const fetchJobs = async ({ queryKey }) => {
    const [_key, { job_title, location, keyword, page }] = queryKey

    const { data } = await axiosInstance.get('/jobs', {
        params: {
            job_title,
            location,
            keyword,
            page : page + 1,
            limit: 10
        }
    });

    return data;
}

// 'jobs' → The base identifier for your jobs query.
// { job_title, location, keyword, page } → The filter/search params, making key dynamic

const useJobsQuery = () => {

    const { job_title, location, keyword, page } = useJobFilters(); // from zustand state

    return useQuery({
        queryKey : ['jobs', { job_title, location, keyword, page }],
        queryFn : fetchJobs,
        keepPreviousData: true, // smooth pagination
        staleTime: 1000 * 60 * 5, // cache 5 minutes
    });
}

export default useJobsQuery;