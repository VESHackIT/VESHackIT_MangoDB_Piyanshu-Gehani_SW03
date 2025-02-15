from flask import Flask, request, jsonify
import whisper
import subprocess
import os
from flask_cors import CORS
from transformers import pipeline

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load Hugging Face pipelines
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

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
    save_dir = os.path.dirname(os.path.abspath(__file__))  # Get script directory
    video_path = os.path.join(save_dir, "Recording_2025-02-15_190352.mp4")
    
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
    """Summarize and analyze sentiment of transcribed text."""
    data = request.get_json()
    if "text" not in data:
        return jsonify({"error": "No text provided"}), 400
    
    text = data["text"]

    # Summarization
    summary = summarizer(text, max_length=150, min_length=50, do_sample=False)
    
    # Sentiment Analysis
    sentiment = sentiment_analyzer(text)

    return jsonify({
        "summary": summary[0]['summary_text'],
        "sentiment": sentiment[0]
    })

if __name__ == "__main__":
    app.run(debug=True, port=5005)
