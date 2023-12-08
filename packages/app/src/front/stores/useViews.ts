import { create } from 'zustand'
import { LogView } from '../types/view'

type ViewState = {
  view: LogView
  setView: (view: LogView) => void
}

export const useViews = create<ViewState>((set) => ({
  view: 'List',
  setView: (view: LogView) => set({ view }),
}))
