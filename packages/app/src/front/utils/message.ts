import { StoredMessage } from '../stores/messageStore'

export const groupMessagesWithTheSameContent = (messages: StoredMessage[]) => {
  const groupedMessages: StoredMessage[] = []
  messages.forEach((message) => {
    const lastMessage = groupedMessages[groupedMessages.length - 1]
    if (
      lastMessage &&
      lastMessage.source === message.source &&
      lastMessage.data.content === message.data.content &&
      lastMessage.data.tag === message.data.tag
    ) {
      lastMessage.quantity++
    } else {
      groupedMessages.push({ ...message, quantity: 1 })
    }
  })
  return groupedMessages
}
