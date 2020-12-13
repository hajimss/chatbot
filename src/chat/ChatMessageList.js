import React from 'react'
import BotMessage from './BotMessage'
import UserMessage from './UserMessage'

export default function ChatMessageList({chatMessages}) {

    return chatMessages.map(
        chatMessage => {
            if (chatMessage.from === "user") {
                return <UserMessage chatMessage={chatMessage} />
            }

            // else chatbot
            return <BotMessage chatMessage={chatMessage} />

        }
    )
}
