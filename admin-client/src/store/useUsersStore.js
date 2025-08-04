import { create } from 'zustand'

const useUsersStore = create((set) => ({
    page: 1,
    limit: 10,
    email: '',
    setPage: (page) => set({ page }),
    setEmail: (key, value) => set({ [key]: value, page: 1 }),
}))

export default useUsersStore;