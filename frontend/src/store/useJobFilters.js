import { create } from 'zustand';

const useJobFilters = create((set) => ({
  job_title: '',
  location: '',
  keyword: '',
  page: 1,
  setFilter: (name, value) => set({ [name]: value, page: 1 }),
  setPage: (page) => set({ page }),
}));

export default useJobFilters;
