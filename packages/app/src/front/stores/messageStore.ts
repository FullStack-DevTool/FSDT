import { FsdtLogMessageContent, FsdtServerMessage } from '@fullstack-devtool/core'
import { create } from 'zustand'
import { groupMessagesWithTheSameContent } from '../utils/message'

export type StoredMessage = FsdtServerMessage<FsdtLogMessageContent> & {
  quantity: number
}

interface MessageState {
  messages: StoredMessage[]
  sources: string[]
  tags: string[]
  addMessage: (message: FsdtServerMessage<FsdtLogMessageContent>) => void
  addMessages: (messages: FsdtServerMessage<FsdtLogMessageContent>[]) => void
  clearMessages: () => void
}

export const useMessageStore = create<MessageState>((set) => ({
  messages: [],
  sources: [],
  tags: [],
  addMessage: (message) =>
    set((state) => {
      // Group messages with the same content
      const lastMessage = state.messages[state.messages.length - 1]
      if (
        lastMessage &&
        lastMessage.source === message.source &&
        lastMessage.data.content === message.data.content &&
        lastMessage.data.tag === message.data.tag
      ) {
        lastMessage.quantity++
        return { messages: [...state.messages] }
      }
      // Add new message
      const newSources = [...state.sources]
      const newTags = [...state.tags]
      if (!newSources.includes(message.source)) {
        newSources.push(message.source)
      }
      if (!newTags.includes(message.data.tag) && message.data.tag) {
        newTags.push(message.data.tag)
      }
      return { messages: [...state.messages, { ...message, quantity: 1 }], sources: newSources, tags: newTags }
    }),
  addMessages: (messages) =>
    set((state) => {
      const newSources = [...state.sources]
      const newTags = [...state.tags]
      messages.forEach((message) => {
        if (!newSources.includes(message.source)) {
          newSources.push(message.source)
        }
        if (!newTags.includes(message.data.tag) && message.data.tag) {
          newTags.push(message.data.tag)
        }
      })
      return {
        messages: groupMessagesWithTheSameContent([
          ...state.messages,
          ...messages.map((mess) => ({ ...mess, quantity: 1 })),
        ]),
        sources: newSources,
        tags: newTags,
      }
    }),
  clearMessages: () => set({ messages: [] }),
}))
