import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import useUsersStore from '../store/useUsersStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

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

const banUser = async (userId) => {
    try {
        const { data } = await axiosInstance.delete(`/admin/ban-user/${userId}`);
        return data;
    }
    catch (error) {
        console.error("Error banning user:", error);
        throw error;
    }
};


const unBanUser = async (userId) => {
    try {
        const { data } = await axiosInstance.put(`/admin/unban-user/${userId}`);
        return data;
    }
    catch (error) {
        console.error("Error unbanning user:", error);
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

export const useBanUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId) => banUser(userId),

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']}); // refresh user list
        },

        onError: (error) => {
            console.error('Ban User Error:', error);
            toast.error('Failed to ban user');
        },
    });
}

export const useUnBanUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (userId) => unBanUser(userId),

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['users']}); // refresh user list
        },

        onError: (error) => {
            console.error('Unban User Error:', error);
            toast.error('Failed to unban user');
        },
    });
}