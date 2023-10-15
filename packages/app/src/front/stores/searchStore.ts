import {create} from "zustand";

interface SearchState {
  search: string,
setSearch: (search: string) => void,
clearSearch: () => void,
}

export const useSearchStore = create<SearchState>((set, get) => ({
  search: "",
  setSearch: (search: string) => set({search}),
  clearSearch: () => set({search: ""}),
}));
