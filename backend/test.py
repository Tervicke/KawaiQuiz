import sqlite3 as db
import json
import os
conn = db.connect('score.db' , check_same_thread=False)
cur = conn.cursor()
cur.execute("DELETE FROM scores")
conn.commit()
conn.close()
