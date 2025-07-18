import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAddBookmark = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (jobId) => {
            const { data } = await axiosInstance.post('/bookmarks', {
                jobId
            })
            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries(['bookmarks'])   // refresh bookmark list
        },

        onError: (error) => {
            console.error('Bookmark Error:', error);
            toast.error('Failed to bookmark');
        },

    })
};


export const useDeleteBookmark = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (bookmarkId) => {
            const { data } = await axiosInstance.delete(`/bookmarks/${bookmarkId}`);
            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries(['bookmarks']); // refresh
        },

        onError: (error) => {
            console.error('Unbookmark Error:', error);
            toast.error('Failed to remove bookmark');
        },

    });


}