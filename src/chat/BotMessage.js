import React from 'react'
// npm install --save-dev @iconify/react @iconify-icons/mdi
import { Icon, InlineIcon } from '@iconify/react';
import robotHappyOutline from '@iconify-icons/mdi/robot-happy-outline';

export default function BotMessage({chatMessage}) {

    const style = {
        paddingTop: "10px",
        paddingBottom: "10px"
    }

    const blockStyle = {
        display: "inline-block",
        marginLeft: "10px",
        padding: "15px",
        borderRadius: "25px"
    }

    const messageStyle = {
        backgroundColor: "#1F3472",
        color: "white",
        fontSize: "30px"
    }

    const icon = {
        backgroundColor: "white",
        height: "20px",
        width: "20px",
        textAlign:"center"
    }

    return (
            <div key={chatMessage.id} className={chatMessage.from} style={style}>
                <div>
                    <p style={{...blockStyle, ...icon}}>
                        <Icon icon={robotHappyOutline} />
                    </p>
                    <p style={{...blockStyle, ...messageStyle}}>{chatMessage.message}</p>
                </div>
            </div>
    )   
}
