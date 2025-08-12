
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
  setFormData: (data) => set({ formData: data }),
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
}));

export default useResumeStore;
