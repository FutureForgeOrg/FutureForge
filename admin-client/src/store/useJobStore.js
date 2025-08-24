import { create } from "zustand";

const useJobsStore = create((set) => ({
  company: "",
  page: 1,
  limit: 10,

  setCompany: (key, value) => set({ [key]: value }),
  setPage: (page) => set({ page }),
}));

export default useJobsStore;
