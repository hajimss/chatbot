import axios from "axios";

const BASE_URL = "https://chatboy2020.herokuapp.com"
// const BASE_URL = "http://localhost:8080" // uncomment this for local development

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

export default postChatRequest;