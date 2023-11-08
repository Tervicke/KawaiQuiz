# A very simple Flask Hello World app for you to get started with...

from flask import Flask
from flask import jsonify
import sqlite3 as db

app = Flask(__name__)

@app.route('/')
def hello_world():
    conn = db.connect('dat.db' , check_same_thread=False)
    cur = conn.cursor()
    cur.execute("Select * from data ORDER BY RANDOM() LIMIT 10")
    return jsonify(cur.fetchall());

if __name__ =='__main__':  
    app.run(debug = True)
