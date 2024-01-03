import { FsdtLogMessageContent, FsdtServerMessage } from '@fullstack-devtool/core'
import { create } from 'zustand'

interface MessageState {
  messages: FsdtServerMessage<FsdtLogMessageContent>[]
  sources: string[]
  tags: string[]
  addMessage: (message: FsdtServerMessage<FsdtLogMessageContent>) => void
  clearMessages: () => void
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  sources: [],
  tags: [],
  addMessage: (message) =>
    set((state) => {
      const newSources = [...state.sources]
      const newTags = [...state.tags]
      if (!newSources.includes(message.source)) {
        newSources.push(message.source)
      }
      if (!newTags.includes(message.data.tag) && message.data.tag) {
        newTags.push(message.data.tag)
      }
      return { messages: [...state.messages, message], sources: newSources, tags: newTags }
    }),
  clearMessages: () => set({ messages: [] }),
}))
