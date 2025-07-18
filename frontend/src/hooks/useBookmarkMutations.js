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
            queryClient.invalidateQueries({queryKey: ['bookmarks']})   // refresh bookmark list
        },

        onError: (error) => {
            console.error('Bookmark Error:', error);
            toast.error('Failed to bookmark');
        },

    })
};


//  How It Works Internally :- queryClient.invalidateQueries() method

// After successful mutation (add/delete),
// React Query calls invalidateQueries(['bookmarks']),
// It marks the bookmarks query as stale,
// Automatically triggers a refetch using the original queryFn (useBookmarksQuery),
// UI updates with the fresh result



export const useDeleteBookmark = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (bookmarkId) => {
            const { data } = await axiosInstance.delete(`/bookmarks/${bookmarkId}`);
            return data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['bookmarks']}); // refresh
        },

        onError: (error) => {
            console.error('Unbookmark Error:', error);
            toast.error('Failed to remove bookmark');
        },

    });

}