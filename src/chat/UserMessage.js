import React from 'react'
// npm install --save-dev @iconify/react @iconify-icons/emojione
import { Icon, InlineIcon } from '@iconify/react';
import boyLightSkinTone from '@iconify-icons/emojione/boy-light-skin-tone';

export default function UserMessage({chatMessage}) {

    const style = {
        height: "40px",
        textAlign: "right"
    }

    const blockStyle = {
        display: "inline-block",
        marginLeft: "10px",
        padding: "5px",
        borderRadius: "15px"
    }

    const messageStyle = {
        backgroundColor: "#44486F",
        color: "white"
    }

    const icon = {
        backgroundColor: "white",
        height: "20px",
        width: "20px",
        textAlign:"center"
    }


    return (
        <div key={chatMessage.id}>
            <div className={chatMessage.from} style={style}>
                <div>
                    <p style={{...blockStyle, ...messageStyle}}>{chatMessage.message}</p>
                    <p style={{...blockStyle, ...icon}}>
                        <Icon icon={boyLightSkinTone} />
                    </p>
                </div>
            </div>
        </div>
    )   
}
