
from flask import Flask
from flask import jsonify
import sqlite3 as db
from flask_cors import CORS, cross_origin
import ast 
from flask import request
app = Flask(__name__)

CORS(app)

@app.route('/')
def hello_world():
    with open('today.txt' , 'r') as reader:
        data_string = reader.read()
        data = eval(data_string)
    return jsonify(data[0])

@app.route('/post', methods = ['GET','POST'])
def post_score():
    data = request.get_json(force=True)
    print(list(data.keys())[0])
    conn = db.connect('score.db' , check_same_thread=False)
    cur = conn.cursor()
    cur.execute("insert into scores(ip , score) values (?,?)",( list(data.keys())[0] , data[list(data.keys())[0]] ) )
    conn.commit()

    return("success")


if __name__ =='__main__':  
    app.run(debug = True)
