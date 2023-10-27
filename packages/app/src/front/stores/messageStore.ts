import { FsdtServerMessage } from '@fullstack-devtool/core'
import { create } from 'zustand'

interface MessageState {
  messages: FsdtServerMessage[]
  addMessage: (message: FsdtServerMessage) => void
  clearMessages: () => void
}

export const useMessageStore = create<MessageState>((set, get) => ({
  messages: [],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}))
