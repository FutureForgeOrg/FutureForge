import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useProfileStore from "../store/useProfileStore";
import { axiosInstance } from '../lib/axios'

const getProfile = async () => {
    const { data } = await axiosInstance.get("/profile")
    return data;
}

const saveProfile = async (profileData) => {
    const { data } = await axiosInstance.post("/profile", profileData);
    return data;
}

const fetchProfileCompletion = async () =>{
    const { data } = await axiosInstance.get("/profile/completion-status");
    return data;
}

export const useProfileQuery = () => {
    const setProfile = useProfileStore((state) => state.setProfile);

    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
        retry: false,
        onSuccess: (data) => {
            setProfile(data); // sync to Zustand
        },
        onError: () => {
            setProfile(null);
        }
    });
};

export const useSaveProfileMutation = () => {
    const queryClient = useQueryClient();
    const setProfile = useProfileStore((state) => state.setProfile);

    return useMutation({
        mutationFn: saveProfile,
        onSuccess: (data) => {
            setProfile(data.profile); // sync updated data to Zustand
            queryClient.invalidateQueries(["profile"]);
        }
    });
};

export function useProfileCompletion() {
  const setProfileCompletion = useProfileStore((state) => state.setProfileCompletion);

  return useQuery({
    queryKey: ["profileCompletion"],
    queryFn: fetchProfileCompletion,
    onSuccess: (data) => {
      setProfileCompletion(data.completion);
      return data;
    },
  });
}
