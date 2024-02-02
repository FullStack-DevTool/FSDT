import { EventType, LogLevel } from '@fullstack-devtool/core'
import { StoredMessage } from '../stores/messageStore'
import { groupMessagesWithTheSameContent } from './message'

describe('message', () => {
  describe('groupMessagesWithTheSameContent', () => {
    it('should group messages with the same content', () => {
      const allMessages: StoredMessage[] = [
        {
          id: 1,
          source: 'source1',
          type: EventType.LOG,
          data: {
            content: 'content1',
            tag: 'tag1',
            timestamp: '1',
            level: LogLevel.LOG,
          },
          quantity: 1,
        },
        {
          id: 2,
          source: 'source1',
          type: EventType.LOG,
          data: {
            content: 'content1',
            tag: 'tag1',
            timestamp: '2',
            level: LogLevel.LOG,
          },
          quantity: 1,
        },
        {
          id: 3,
          source: 'source1',
          type: EventType.LOG,
          data: {
            content: 'content2',
            tag: 'tag1',
            timestamp: '3',
            level: LogLevel.LOG,
          },
          quantity: 1,
        },
        {
          id: 4,
          source: 'source1',
          type: EventType.LOG,
          data: {
            content: 'content2',
            tag: 'tag1',
            timestamp: '4',
            level: LogLevel.LOG,
          },
          quantity: 1,
        },
      ]
      const groupedMessages: StoredMessage[] = [
        {
          id: 1,
          source: 'source1',
          type: EventType.LOG,
          data: {
            content: 'content1',
            tag: 'tag1',
            timestamp: '1',
            level: LogLevel.LOG,
          },
          quantity: 2,
        },
        {
          id: 3,
          source: 'source1',
          type: EventType.LOG,
          data: {
            content: 'content2',
            tag: 'tag1',
            timestamp: '3',
            level: LogLevel.LOG,
          },
          quantity: 2,
        },
      ]

      expect(groupMessagesWithTheSameContent(allMessages)).toEqual(groupedMessages)
    })
  })
})
