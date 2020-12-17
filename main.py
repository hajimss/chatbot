import nltk
nltk.download('punkt')
from nltk.stem.lancaster import LancasterStemmer
# Stemming is used to remove the 'unnecessary' parts of the word
# Lancaster Stemming is a type of stemming (others are Porter and Snowball)
stemmer = LancasterStemmer()

import numpy as np
import tflearn
import tensorflow as tf
import random
import json
import pickle

with open("intents.json") as file:
    data = json.load(file) 

try:
    # see tutorial 4 for the explanation
    with open("data.pickle", "rb") as f:
        words, labels, training, output = pickle.load(f)
except:
    words = []
    labels = []
    docs = []
    docs_words = []
    docs_tag = []

    for intent in data["intents"]:
        for pattern in intent["patterns"]:
            word = nltk.word_tokenize(pattern)
            # words contain all the individual tokenised words that exist in the pattern
            words.extend(word)
            # docs_words contain a list of all the tokenized words
            docs_words.append(word)
            # docs_tag contain a list of the tags. each tag is multiplied by the number of patterns
            docs_tag.append(intent["tag"])
        
        if intent["tag"] not in labels:
            # labels contain a list of the tags. but they only appear once, unlike docs_tag
            labels.append(intent["tag"])

    # this is the part where the words are stemmed
    words = [stemmer.stem(w.lower()) for w in words if w != "?"]

    # set() will group all the duplicates tgt
    words = sorted(list(set(words)))


    labels = sorted(labels)

    training = []
    output = []

    out_empty = [0 for _ in range(len(labels))]

    for x, doc in enumerate(docs_words):
        bag = []
        word = [stemmer.stem(w.lower()) for w in doc]

        for w in words:
            if w in word:
                bag.append(1)
            else:
                bag.append(0)

        # copy the output_empty list to output_row
        output_row = out_empty[:]

        output_row[labels.index(docs_tag[x])] = 1

        training.append(bag)
        output.append(output_row)

    training = np.array(training)
    output = np.array(output)

    with open("data.pickle", "wb") as f:
        pickle.dump((words, labels, training, output), f)    

tf.compat.v1.reset_default_graph()

net = tflearn.input_data(shape=[None, len(training[0])])
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, 8)
net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
net = tflearn.regression(net)

model = tflearn.DNN(net)

try:
    model.load("model.tflearn")
    print("LOADED")
except:
    """
    tf.compat.v1.reset_default_graph()

    net = tflearn.input_data(shape=[None, len(training[0])])
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, 8)
    net = tflearn.fully_connected(net, len(output[0]), activation="softmax")
    net = tflearn.regression(net)

    model = tflearn.DNN(net)
    """
    model.fit(training, output, n_epoch=1000, batch_size=8, show_metric=True)
    model.save("model.tflearn")

#################################################################################

def bag_of_words(s, words):
    bag = [0 for _ in range(len(words))]

    s_words = nltk.word_tokenize(s)
    s_words = [stemmer.stem(word.lower()) for word in s_words]

    for se in s_words:
        for i, w in enumerate(words):
            if w == se:
                bag[i] = 1
    return np.array(bag)

def chat(msg):
    results = model.predict([bag_of_words(msg, words)])[0]
    results_index = np.argmax(results)
    results_list = results.tolist()
    probability = results.tolist()[results_index]

    tag = labels[results_index]

    if results[results_index] > 0.7:
        for tg in data["intents"]:
            if tg["tag"] == tag:
                responses = tg['responses']

        return {
            "reply": random.choice(responses),
            "results": results_list,
            "probability": probability
            }
    else: 
        return {
            "reply": "Sorry I did not quite get that",
            "results": results_list,
            "probability": probability
            }