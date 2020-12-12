from flask import Flask, request
from flask_cors import CORS, cross_origin
import main

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/chat', methods=["GET", "POST"])
def chat():
    if request.method == "GET":
        return "Nothing"
    if request.method == "POST":
        words = request.form["content"]
        response = main.chat(words)
        # response is a JSON of reply, results(list of prob of all the tags) and probability (prob of the highest)
        return response


if __name__ == '__main__':
    app.run(port=8080, debug=True)