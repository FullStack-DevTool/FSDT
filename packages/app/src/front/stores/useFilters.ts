import { LogLevel } from '@fullstack-devtool/core'
import { create } from 'zustand'

export type Filters = {
  search: string
  setSearch: (search: string) => void
  clearSearch: () => void

  selectedLevels: LogLevel[]
  toggleLevel: (level: LogLevel) => void

  selectedSources: string[]
  toggleSource: (source: string) => void

  selectedTags: string[]
  toggleTag: (tag: string) => void
}

export const useFilters = create<Filters>((set) => ({
  search: '',
  setSearch: (search: string) => set({ search }),
  clearSearch: () => set({ search: '' }),

  selectedLevels: Object.values(LogLevel),
  toggleLevel: (level: LogLevel) =>
    set((state) => {
      if (state.selectedLevels.includes(level)) {
        return {
          selectedLevels: state.selectedLevels.filter((l) => l !== level),
        }
      }
      return {
        selectedLevels: [...state.selectedLevels, level],
      }
    }),

  selectedSources: [],
  toggleSource: (source: string) =>
    set((state) => {
      if (state.selectedSources.includes(source)) {
        return {
          selectedSources: state.selectedSources.filter((s) => s !== source),
        }
      }
      return {
        selectedSources: [...state.selectedSources, source],
      }
    }),

  selectedTags: [],
  toggleTag: (tag: string) =>
    set((state) => {
      if (state.selectedTags.includes(tag)) {
        return {
          selectedTags: state.selectedTags.filter((t) => t !== tag),
        }
      }
      return {
        selectedTags: [...state.selectedTags, tag],
      }
    }),
}))
