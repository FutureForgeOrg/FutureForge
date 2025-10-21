
import { create } from 'zustand';

const useResumeStore = create((set) => ({
  formData: {
    name: "",
    email: "",
    phone: "",
    address: "",
    skills: "",
    education: [
      { degree: "", institution: "", year: "", percentage: "" },
    ],
    experience: "",
    projects: [
      { name: "", description: "", link: "" }
    ],
    certificates: [
      { name: "", issuer: "" }
    ],
    links: [
      { label: "", url: "" },

    ]

  },
  selectedTemplate: 1,

  // Actions
  // setFormData will accept fn not just plain object to avoid stale closures
  setFormData: (updater) =>
    set((state) => ({
      formData:
        typeof updater === 'function'
          ? updater(state.formData)
          : { ...state.formData, ...updater }
    })),

  updateFormField: (field, value) =>
    set((state) => ({
      formData: { ...state.formData, [field]: value }
    })),
  setSelectedTemplate: (template) => set({ selectedTemplate: template }),

  resetForm: () =>
    set({
      formData: {
        name: "",
        email: "",
        phone: "",
        address: "",
        skills: "",
        education: [
          { degree: "", institution: "", year: "", percentage: "" },
        ],
        experience: "",
        projects: [
          { name: "", description: "", link: "" }
        ],
        certificates: [
          { name: "", issuer: "" }
        ],
        links: [
          { label: "", url: "" },
        ]

      },
      selectedTemplate: 1
    }),
    
  profileLoaded: false,
  setProfileLoaded: (value) => set({ profileLoaded: value }),
}));

export default useResumeStore;
