import { create } from "zustand";

const useProfileStore = create((set) => ({
  profile: null,
  profileCompletion: 0,

  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null, profileCompletion: 0 }),
  setProfileCompletion: (completion) => set({ profileCompletion: completion }),
}));

export default useProfileStore;
