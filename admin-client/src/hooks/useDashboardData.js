import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../lib/axios';

const fetchDashboardData = async () => {
    try{
        const res = await axiosInstance.get('/admin/stats');
        return res.data;
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
}

export const useDashboardData = () => {
    return useQuery({
        queryKey: ['dashboardData'],
        queryFn: fetchDashboardData,
        // refetchInterval: 60000,          // refetch every minute
        staleTime: 300000,              // data is fresh for 5 minutes
    });
}
