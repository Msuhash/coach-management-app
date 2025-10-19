// src/store.js
import {create} from "zustand";

export const useUI = create((set) => ({
  // modal
  isModalOpen: false,
  modalMode: "add", // 'add' | 'edit'
  selectedCoach: null,

  // filters/search
  search: "",
  category: "",
  status: "",

  // actions
  openAdd: () => set(() => ({ isModalOpen: true, modalMode: "add", selectedCoach: null })),
  openEdit: (coach) => set(() => ({ isModalOpen: true, modalMode: "edit", selectedCoach: coach })),
  closeModal: () => set(() => ({ isModalOpen: false, selectedCoach: null })),

  setSearch: (s) => set(() => ({ search: s })),
  setCategory: (c) => set(() => ({ category: c })),
  setStatus: (s) => set(() => ({ status: s })),
}));
