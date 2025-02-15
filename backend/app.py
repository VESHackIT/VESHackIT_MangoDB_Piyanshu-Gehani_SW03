from flask import Flask, request, jsonify
from pymongo import MongoClient
import json
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client['ves']
collection = db['mycollection']

@app.route('/')
def home():
    sample_doc = {"name": "John Doe", "age": 30, "city": "New York"}
    result = collection.insert_one(sample_doc)

    # Convert `_id` to a string
    sample_doc["_id"] = str(result.inserted_id)

    return jsonify({
        "message": "Sample JSON inserted",
        "document": sample_doc
    })

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
