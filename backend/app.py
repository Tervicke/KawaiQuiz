
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

@app.route('/post', methods = ['POST'])
def post_score():
    data = request.get_json(force=True)
    print(data)
    print(list(data.keys())[0])
    conn = db.connect('score.db' , check_same_thread=False)
    cur = conn.cursor()
    # ip = get ip 
    cur.execute("insert into scores(ip , score) values (?,?)",( ip , data[list(data.keys())[0]] ) )
    conn.commit()
    return ("success")

@app.route('/check')
def check():
    # get the ip check whether it exists in the score.db and then if it does return allowed and the score or not allowed 
    ip = "123.0.0.1"
    conn = db.connect('score.db' , check_same_thread=False)
    cur = conn.cursor()
    cur.execute('select ip from scores where ip = "age"')
    #cur.execute('select ip from scores where ip = (?)',(ip))
    row=cur.fetchall()
    if not (len(row) == 0):
        return "not allowed"
    else: 
        return "allowed"

if __name__ =='__main__':  
    app.run(debug = True)
