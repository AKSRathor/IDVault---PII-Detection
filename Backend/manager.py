from presidio_analyzer import AnalyzerEngine, Pattern, PatternRecognizer
from flask import Flask, request, jsonify
from flask_cors import CORS
import pprint
import os
import pandas as pd
from dotenv import load_dotenv
import json
import mysql.connector

load_dotenv()
app=Flask(__name__)
CORS(app)


patternList = []
class PatternFormat():
    score = 1
    status = False
    mytemprecognizer = None
    def __init__(self, name, regex, score):
        self.name = name
        self.regex = regex
        self.score = score

    def add_pattern(self, analyzer):
        my_temp_pattern = Pattern(
            name=self.name,
            regex=self.regex,
            score=self.score
        )
        my_temp_recognizer = PatternRecognizer(
            supported_entity=self.name,
            patterns=[my_temp_pattern]
        )
        self.mytemprecognizer = my_temp_recognizer
        analyzer.registry.add_recognizer(my_temp_recognizer)
        self.status = True
    def remove_pattern(self, analyzer):
        if self.status:
            analyzer.registry.remove_recognizer(self.mytemprecognizer)
            print(self.mytemprecognizer)
            self.status = False
            print(f"Recognizer for {self.name} removed.")
        else:
            print(f"No recognizer found for {self.name}.")

    
@app.route("/getalldatabases", methods =['GET', 'POST'])
def show_db():
    mydb = mysql.connector.connect(
        host=request.json["host"],
        user=request.json["user"],
        password=request.json["password"]
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

@app.route("/showalltables", methods =['GET', 'POST'])
def showalltables():
    print("start fetching")
    print("mydb ", request.json["database"])
    connection = mysql.connector.connect(
        host=request.json["host"],
        user=request.json["user"],
        password=request.json["password"],
        database = request.json["database"]
    )
    cursor = connection.cursor()
    
    cursor.execute("SHOW TABLES;")
    mytables = []
    for table in cursor.fetchall():
        mytables.append(table[0])
        print(table[0])
    
    connection.close() 
    return mytables
    

@app.route("/showtable", methods =['GET', 'POST'])
def showtable():
    
    connection = mysql.connector.connect(
        host=request.json["host"],
        user=request.json["user"],
        password=request.json["password"],
        database = request.json["database"]
    )
    
    # cursor.execute("Select * from " + request.json["table"] + ";")
    query = "Select * from " + request.json["table"] + ";".format(request.json["table"])
    x = pd.read_sql(query, connection)
    xjson = x.to_json(orient='records', lines=True)
    # xjsonfinal = json.loads(xjson)
    xjsonlines = xjson.splitlines()

# Convert each line into a JSON object and store in a list
    json_objects = [json.loads(line) for line in xjsonlines]
    mytables = []
    print()
    pprint.pprint(json_objects)
    return json_objects
    



@app.route("/traversedoc", methods =['GET', 'POST'])
def tranversedoc():
    if(request.method == "POST"):
        analyzer = AnalyzerEngine()
        myarr = request.json["add_pattern"]
        for x in myarr:
            # print(x['name'])
            pf = PatternFormat(x["name"], x["regex"], x["score"])
            pf.add_pattern(analyzer)
            patternList.append(pf)
        results = analyzer.analyze(text=request.json["document_content"], language="en")
        if not results:
            print("No PII Detected.")
        else:
            return results[0].entity_type
            print(results)
            for x in results:
                print(x.entity_type)
        del analyzer
    return "NA"


def parse_analyzer(analyzer, mytext, mykey):
    print(mykey)
    results = analyzer.analyze(text=str(mykey) + ": " +str(mytext), language="en")
    if not results:
        return "NAP"
    else:
        return results[0].entity_type
    return "NAP"

@app.route("/traversedocall", methods =['GET', 'POST'])
def tranversedocall():
    if(request.method == "POST"):
        analyzer = AnalyzerEngine()
        myarr = request.json["add_pattern"]
        for x in myarr:
            pf = PatternFormat(x["name"], x["regex"], x["score"])
            pf.add_pattern(analyzer)
            patternList.append(pf)
        mydataarr = request.json["document_content"]
        for i in range(len(mydataarr)):
            myobj = mydataarr[i]
            for key in myobj:
                analyzed_val = parse_analyzer(analyzer, myobj[key], key)
                myobj[key] = {"real_text":myobj[key], "pii":analyzed_val, "pii_cat": get_cat(analyzed_val)}
        pprint.pprint(mydataarr)
        
        del analyzer
        return mydataarr
    return "NA"


@app.route("/getcsvtraversal", methods =['GET', 'POST'])
def getcsvtraversal():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    mycsv = pd.read_csv(request.files['file'])
    result = mycsv.to_json(orient='records')
    analyzer = AnalyzerEngine()

    mydataarr = result
    data = json.loads(mydataarr)
    for i in range(len(data)):
        myobj = data[i]
        
        for key in myobj:
            analyzed_val = parse_analyzer(analyzer, myobj[key], key)
            myobj[key] = {"real_text":myobj[key], "pii":analyzed_val, "pii_cat": get_cat(analyzed_val)}

    
    del analyzer
    return data



def get_cat(mystr):
    if mystr == "PERSON":
        return "Name"
    elif mystr == "EMAIL_ADDRESS":
        return "Email"
    elif mystr == "INDIA_PASSPORT":
        return "Passport"
    elif mystr == "INDIA_PAN":
        return "PAN"
    elif mystr == "INDIA_DL":
        return "DL"
    elif mystr == "INDIA_VOTER_ID":
        return "Voter ID"
    elif mystr == "INDIA_AADHAAR_ID":
        return "Aadhaar ID"
    return "NA"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
