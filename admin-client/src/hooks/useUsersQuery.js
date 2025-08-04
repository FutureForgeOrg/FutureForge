import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../../../frontend/src/lib/axios';
import useUsersStore from '../store/useUsersStore';

const fetchUsers = async ({ queryKey }) => {
    try {
        const [_key, { page, limit, email }] = queryKey;

        const {data} = await axiosInstance.get('/admin/all-users', {
            params: {
                page,
                limit,
                email
            }
        });

        return data;

    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};


export const useUsersQuery = () => {
    const {page, limit, email} = useUsersStore();

    return useQuery({
        queryKey: ['users', { page, limit, email }],
        queryFn: fetchUsers,
        keepPreviousData: true, // smooth pagination
        staleTime: 1000 * 60 * 5, // cache for 5 minutes
        refetchOnWindowFocus: false, // do not refetch on window focus
    });
}
