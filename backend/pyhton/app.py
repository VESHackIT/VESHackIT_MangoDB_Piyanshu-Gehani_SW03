from flask import Flask, request, jsonify
from pymongo import MongoClient
import google.generativeai as genai
import json
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
collection = db['mycollection']

@app.route('/')
def home():
    return "Welcome to the Flask App"

if __name__ == '__main__':
    app.run(debug=True)