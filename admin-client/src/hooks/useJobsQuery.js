import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../src/lib/axios";
import useJobsStore from "../store/useJobStore.js";


const fetchJobs = async ({ queryKey }) => {
  const [_key, filters] = queryKey;

  console.log("Fetching jobs with filters:", filters);

  const { data } = await axiosInstance.get("/jobs", {
    params: filters,
    headers: { "Cache-Control": "no-cache" },
  });

  return data;
};

export const useJobsQuery = () => {
  const { page, limit, company_name, job_title, location, position } = useJobsStore();

  return useQuery({
    queryKey: [
      "jobs",
      {
        page,
        limit,
        company_name,
        job_title,
        location,
        position,   // include all fields that should trigger refetch
      },
    ],
    queryFn: fetchJobs,
    keepPreviousData: true,
  });
};



export const useDeleteJob = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (jobId) => axiosInstance.delete(`/admin/jobs/${jobId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["jobs"], exact: false });
    },
  });
};


export const useJobById = (id) => {
  return useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/admin/jobs/${id}`, {
        headers: { "Cache-Control": "no-cache" }, // avoid 304 caching
      });

      return data.job;
    },
    enabled: !!id, // only fetch if id exists
  });
};


export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => axiosInstance.put(`/admin/jobs/${id}`, data),
    onSuccess: (_, { id }) => {
      // invalidate jobs list & single job query
      queryClient.invalidateQueries({ queryKey: ["jobs"], exact: false });
      queryClient.invalidateQueries({ queryKey: ["job", id] }); // invalidate the single job
    },
  });
};

