# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import jsonify
import sqlite3 as db
from flask_cors import CORS, cross_origin
import ast 

app = Flask(__name__)

CORS(app)

@app.route('/')
def hello_world():
    with open('today.txt' , 'r') as reader:
        data_string = reader.read()
        data = eval(data_string)
    return jsonify(data[0])

if __name__ =='__main__':  
    app.run(debug = True)
