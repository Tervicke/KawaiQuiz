import sqlite3 as db
import json
conn = db.connect('dat.db' , check_same_thread=False)
cur = conn.cursor()
cur.execute("Select * from data ORDER BY RANDOM() LIMIT 10")
data = cur.fetchall()
with open('today.txt','w') as writer:
    data_list = [list(data) for elem in data] #convert list of tuples to list of lists
    writer.write(str(data_list))
