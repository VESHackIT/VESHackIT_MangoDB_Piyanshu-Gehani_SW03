from flask import Flask, request, jsonify
import whisper
import subprocess
import os
from flask_cors import CORS
import ollama  # Import Ollama for local Llama 3 model

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

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
    """Summarize and analyze sentiment of transcribed text using Ollama's Llama 3 model."""
    data = request.get_json()
    if "text" not in data:
        return jsonify({"error": "No text provided"}), 400
    
    text = data["text"]
    print("text hereeeeeeeeee",text)

    # Summarization
    summary_prompt = f"Summarize this text: {text}"
    summary_response = ollama.generate(model="llama3.2:3b", prompt=summary_prompt)
    summary = summary_response["response"]

    # Sentiment Analysis
    sentiment_prompt = f"Analyze the sentiment of this text: {text}. Reply only with POSITIVE, NEGATIVE, or NEUTRAL."
    sentiment_response = ollama.generate(model="llama3.2:3b", prompt=sentiment_prompt)
    sentiment = sentiment_response["response"]

    return jsonify({
        "summary": summary.strip(),
        "sentiment": sentiment.strip()
    })

if __name__ == "__main__":
    app.run(debug=True, port=5005)
