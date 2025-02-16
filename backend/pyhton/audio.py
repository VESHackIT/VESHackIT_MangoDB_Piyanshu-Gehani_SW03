from flask import Flask, request, jsonify
import whisper
import google.generativeai as genai
import pdfplumber
import subprocess
import os
from flask_cors import CORS
import ollama
import easyocr  # Import EasyOCR
from PIL import Image

app = Flask(__name__)
CORS(app)

genai.configure(api_key="AIzaSyDWA90uavyhbXY6aJwJc0Vpp2ubF1P0LgY")
reader = easyocr.Reader(["en"])  # Initialize EasyOCR reader (English)

def extract_text_from_pdf(pdf_path):
    """Extracts text from a given PDF file."""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text.strip() + "\n\n"
    return text

def extract_text_from_image(image_path):
    """Extracts text from an image using EasyOCR."""
    result = reader.readtext(image_path, detail=0)  # Extract text without bounding box info
    return " ".join(result)  # Join text fragments

def validate_bank_statement(statement_text):
    """Evaluates the legitimacy of a founder based on their bank statement."""
    prompt = f"""
    Evaluate the legitimacy of the founder based on the provided bank statement:

    {statement_text}

    Consider the following financial metrics:
    - Consistency of income sources
    - Frequency of large cash deposits or withdrawals
    - Presence of loans, debts, or unusual transactions
    - Business-related transactions versus personal expenses
    - Any red flags indicating financial fraud

    Provide a final verdict as 'VALID FOUNDER' or 'POTENTIAL FRAUD' without extra text.
    """
    response = ollama.generate(model="llama3.2:3b", prompt=prompt)
    return response["response"].strip()

@app.route("/validate-statement", methods=["POST"])
def validate_statement():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files["file"]
    file_ext = os.path.splitext(file.filename)[1].lower()
    save_path = "uploaded_statement" + file_ext
    file.save(save_path)

    if file_ext == ".pdf":
        statement_text = extract_text_from_pdf(save_path)
    elif file_ext in [".png", ".jpg", ".jpeg"]:
        statement_text = extract_text_from_image(save_path)
    else:
        os.remove(save_path)
        return jsonify({"error": "Unsupported file format"}), 400
    
    result = validate_bank_statement(statement_text)
    os.remove(save_path)
    
    return jsonify({"validation_result": result})

if __name__ == "__main__":
    app.run(debug=True, port=5005)
