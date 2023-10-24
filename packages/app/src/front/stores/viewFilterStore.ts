import { create } from "zustand";
import { LogView } from "../types/view";

interface FilterState {
  view: LogView;
  source: string;
  tag: string;
  setView: (view: LogView) => void;
  setSource: (source: string) => void;
  setTag: (tag: string) => void;
}

export const useViewFilterStore = create<FilterState>((set, get) => ({
  view: "List",
  source: "",
  tag: "",
  setView: (view) => set({ view }),
  setSource: (source) => set({ source }),
  setTag: (tag) => set({ tag }),
}));
