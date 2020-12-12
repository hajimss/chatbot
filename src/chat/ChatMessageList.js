import React from 'react'
import ChatMessage from './ChatMessage'

export default function ChatMessageList({chatMessages}) {

    return chatMessages.map(
        chatMessage => {
            return <ChatMessage chatMessage={chatMessage} />
        }
    )
}
