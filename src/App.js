import './App.css';
import React, { useState , useRef } from 'react';
import ChatMessageList from './chat/ChatMessageList'
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";

const BASE_URL = "http://localhost:8080"

let postChatRequest = (message) => {

	let bodyFormData = new FormData();
	bodyFormData.append('content', message);

    return new Promise((resolve, reject) => {
        axios({
			method: "post",
			url: BASE_URL + "/chat",
			data: bodyFormData,
			headers: {'Content-Type': 'multipart/form-data' }
		})
		.then(res => {
			resolve(res.data);
		})
		.catch(err => {
				reject({
					stat: 500,
					msg:
						"There was an error processing your request. Please, try again later."
				});
		});
    });
} 

function App() {

	const [chatMessages, setChatMessages] = useState([
		{id: uuidv4(), from: "chatbot", message: "Hello there! How can I help?"},
	])

	const messageToSendRef = useRef()

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

	return (
		<div className="App">
			<ChatMessageList chatMessages={chatMessages}/>
			<input ref={messageToSendRef} type="text"/>
			<button onClick={handleChatFunction}>Chat</button>
		</div>
	);
}

export default App;
