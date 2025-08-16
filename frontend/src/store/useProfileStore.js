import { create } from "zustand";

const useProfileStore = create((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  clearProfile: () => set({ profile: null })
}));

export default useProfileStore;
