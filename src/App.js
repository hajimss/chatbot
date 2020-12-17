import './App.css';
import React, { useState , useRef } from 'react';
import ChatMessageList from './chat/ChatMessageList'
import { v4 as uuidv4 } from 'uuid';
import postChatRequest from './chatRequest'

function App() {

	const [chatMessages, setChatMessages] = useState([
		{id: uuidv4(), from: "chatbot", message: "Hello there! How can I help?"},
	])

	const messageToSendRef = useRef()

	function handleEnter(e){
		if (e.key === 'Enter') {
			handleChatFunction(e)
		}
	}

	function handleChatFunction(e) {
		console.log("[handleChatFunction]")

		const currentMessage = messageToSendRef.current.value
		if (currentMessage === '') {
			console.log("[handleChatFunction] Blank Chat Message")
			return 
		}

		console.log(`[handleChatFunction] ${currentMessage}`) // `This is ${soMany} times easier!`

		// talk to chatbot // POST http://localhost:8080/chat
		// form data containing : content: currentMessage
		
		setChatMessages(currentMessages => {
			return [...currentMessages, 
				{id: uuidv4(), from: "user", message: currentMessage}
			]
		})

		postChatRequest(currentMessage).then(resp => {
			setChatMessages(currentMessages => {
				return [...currentMessages, 
					{id: uuidv4(), from: "chatbot", message: resp.reply}
				]
			})
		})

		messageToSendRef.current.value = null

	}

	const appStyle = {
		marginLeft: "20%",
		marginRight: "20%",
	}

	const chatStyle = {
		marginTop: "5%",
		paddingTop: "30px",
		height: "600px", 
		padding: "10px",
		display: "block",
		overflow:"scroll",
		backgroundColor: "#878CD6"
	}

	const inputStyle = {
		border: "none",
		height: "50px",
		width: "80%",
		outline:"none",
		fontSize: "30px"
	}

	const buttonStyle = {
		height: "50px",
		width: "20%",
		outline:"none",
		fontSize: "30px"
	}

	// Visual Layout
	return (
		<div className="App" style={appStyle}>
			<div style={chatStyle}>
				<ChatMessageList chatMessages={chatMessages}/>
			</div>
			<div>
				<input 
					style={inputStyle} ref={messageToSendRef} type="text" placeholder="Chat with me!" autoFocus 
					onKeyDown={handleEnter}
				/>
				<button style={buttonStyle} onClick={handleChatFunction}>Chat</button>
			</div>
		</div>
	);
}

export default App;
