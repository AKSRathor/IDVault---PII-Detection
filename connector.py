import mysql.connector
import pandas as pd
import json
import pprint


def show_db():
    mydb = mysql.connector.connect(
            host="piidatabase.cnocq48yy9zw.ap-south-1.rds.amazonaws.com",
            user="root",  # Replace with your MySQL username
            password="password",  # Replace with your MySQL password
            
        )
    mycursor = mydb.cursor()
    mycursor.execute("SHOW DATABASES")

    # Fetch all results
    databases = mycursor.fetchall()

    # Print the databases
    dblist = []
    for db in databases:
        dblist.append(db[0])
    pprint.pprint(dblist)
    return dblist

show_db()