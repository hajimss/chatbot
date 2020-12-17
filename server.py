from flask import Flask, request
from flask_cors import CORS, cross_origin
import main

app = Flask(__name__, static_folder='build', static_url_path='')
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html') 

@app.route('/health')
def health_check():
    return 'ok'

@app.route('/chat', methods=["GET", "POST"])
def chat():
    if request.method == "GET":
        return "Nothing"
    if request.method == "POST":
        if "content" not in request.form:
            return {"reply": ""}
        words = request.form["content"]
        response = main.chat(words)
        # response is a JSON of reply, results(list of prob of all the tags) and probability (prob of the highest)
        return response

def init():

    import os, nltk
    if "ENV" in os.environ and os.environ["ENV"] == "PROD":
        nltk.download('punkt')

if __name__ == '__main__':
    init()
    app.run(port=8080, debug=True)