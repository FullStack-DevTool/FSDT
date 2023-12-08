import { create } from 'zustand'

export type AppState = {
  version: string
  setVersion: (version: string) => void
}

export const useApp = create<AppState>((set) => ({
  version: '',
  setVersion: (version) => set({ version }),
}))
