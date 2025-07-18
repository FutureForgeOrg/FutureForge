import { create } from 'zustand';

const useBookmarkStore = create((set) => ({
  page: 1,
  limit: 5,
  keyword: '',
  setPage: (page) => set({ page }),
  setKeyword: (key, value) => set({ [key]: value, page: 1  }),
  //setKeyword: (keyword) => set({ keyword, page: 1 }), // reset page on new search
}));

export default useBookmarkStore;
