from flask import Flask, request, jsonify
import whisper
import google.generativeai as genai
import pdfplumber
import subprocess
import os
from flask_cors import CORS
import ollama  # Import Ollama for local Llama 3 model

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configure Gemini API (Replace with your API key)
genai.configure(api_key="AIzaSyDWA90uavyhbXY6aJwJc0Vpp2ubF1P0LgY")

def extract_audio(video_path, audio_path="output_audio.wav"):
    """Extracts audio from video using ffmpeg."""
    command = ["ffmpeg", "-i", video_path, "-ac", "1", "-ar", "16000", "-y", audio_path]
    subprocess.run(command, check=True)
    return audio_path

def transcribe_audio(audio_path, model_size="medium"):
    """Transcribes audio using OpenAI Whisper."""
    model = whisper.load_model(model_size)
    result = model.transcribe(audio_path)
    return result

@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400
    
    file = request.files["file"]
    save_dir = os.path.dirname(os.path.abspath(__file__))  # Get current script directory
    video_path = os.path.join(save_dir, "uploaded_video.mp4")
    
    file.save(video_path)

    # Extract audio and transcribe
    audio_path = extract_audio(video_path)
    transcription_result = transcribe_audio(audio_path)

    # Cleanup
    os.remove(video_path)
    os.remove(audio_path)

    return jsonify({
        "transcript": transcription_result["text"],
        "segments": transcription_result["segments"]
    })

@app.route("/analyze", methods=["POST"])
def analyze():
    """Summarize, analyze sentiment, and provide suggestions for improving a pitch deck or eco project."""
    data = request.get_json()
    if "text" not in data:
        return jsonify({"error": "No text provided"}), 400
    
    text = data["text"]
    
    # Summarization
    summary_prompt = f"Summarize this pitch discussion: {text}"
    summary_response = ollama.generate(model="llama3.2:3b", prompt=summary_prompt)
    summary = summary_response["response"].strip()

    # Sentiment Analysis
    sentiment_prompt = f"Analyze the sentiment of this discussion: {text}. Reply only with POSITIVE, NEGATIVE, or NEUTRAL."
    sentiment_response = ollama.generate(model="llama3.2:3b", prompt=sentiment_prompt)
    sentiment = sentiment_response["response"].strip().upper()

    # Conditional Suggestions (Restrict to 100 words)
    if sentiment == "POSITIVE":
        suggestion = "Your pitch is already strong! Keep up the great work and focus on scaling your impact."
    else:
        suggestion_prompt = f"""
        Based on the following pitch discussion, suggest **improvements** for the founder's deck and eco project:
        
        - Identify weak points in their pitch.
        - Suggest ways to make the impact stronger.
        - Recommend areas where they can refine their business strategy.
        
        Text: {text}

        **Limit your response to 100 words.**
        """
        suggestion_response = ollama.generate(model="llama3.2:3b", prompt=suggestion_prompt)
        suggestion = suggestion_response["response"].strip()

        # Trim suggestion to 100 words if needed
        words = suggestion.split()
        if len(words) > 100:
            suggestion = " ".join(words[:100]) + "..."

    return jsonify({
        "summary": summary,
        "sentiment": sentiment,
        "suggestions": suggestion
    })

def get_reference_pdf_path():
    """Returns the absolute path of the reference PDF stored in the same directory."""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    return os.path.join(script_dir, "reference.pdf")

def extract_text_from_pdf(pdf_path):
    """Extracts and formats text from a given PDF file."""
    text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()
            if page_text:
                text += page_text.strip() + "\n\n"
    return "\n".join([line.strip() for line in text.split("\n") if line.strip()])


def verify_project(uploaded_pdf):
    """Compares uploaded PDF with reference PDF and sends to Gemini for verification."""
    reference_pdf_path = get_reference_pdf_path()
    
    if not os.path.exists(reference_pdf_path):
        return "REFERENCE PDF NOT FOUND"
    
    reference_text = extract_text_from_pdf(reference_pdf_path)
    uploaded_text = extract_text_from_pdf(uploaded_pdf)

    prompt = f"""
    Compare the following two solar project reports and determine if the uploaded document is legitimate or not.

    **Reference Document (Correct)**:
    {reference_text}

    **Uploaded Document**:
    {uploaded_text}

    Analyze the attached PDF document and determine whether it is a legitimate solar project proposal or a fraudulent one. Examine the document based on the following verification parameters: technical feasibility, financial viability, regulatory compliance, energy generation estimates, and project transparency. Provide a final verdict as 'LEGITIMATE' or 'NOT LEGITIMATE' without any extra text.
    """
    
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)

    return response.text.strip()


@app.route("/verify-project", methods=["POST"])
def verify():
    print("verifying project", request.files)

    # Get the correct key dynamically (handles case mismatches)
    file_key = next((key for key in request.files.keys() if key.lower() == "file"), None)
    
    if not file_key:
        return jsonify({"error": "No file provided", "received_keys": list(request.files.keys())}), 400

    file = request.files[file_key]  # Use the actual key from request.files
    pdf_path = "uploaded_project.pdf"
    file.save(pdf_path)
    
    result = verify_project(pdf_path)
    os.remove(pdf_path)
    
    return jsonify({"verification_result": result})
if __name__ == "__main__":
    app.run(debug=True, port=5005)
