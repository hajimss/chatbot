import React from 'react'

export default function ChatMessage({chatMessage}) {


    return (
        <div key={chatMessage.id} className={chatMessage.from}>
            <p>{chatMessage.message}</p>
        </div>
    )   
}
