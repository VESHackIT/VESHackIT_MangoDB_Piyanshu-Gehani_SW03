from flask import Flask, request, jsonify, send_file
import re
import cv2
import numpy as np
import pandas as pd
import faiss
from sentence_transformers import SentenceTransformer
from PIL import Image
import google.generativeai as genai
import os

# Configure Gemini AI API
API_KEY = os.getenv("GEMINI_API_KEY")  # Use environment variable for security
genai.configure(api_key="API_KEYgit config pull.rebase false")
model = genai.GenerativeModel(model_name='gemini-1.5-pro')

# Initialize Flask app
app = Flask(__name__)

# Load FAISS Search Data
df = pd.read_csv("item.csv")
encoder = SentenceTransformer("all-mpnet-base-v2")
vectors = encoder.encode(df.text.tolist(), convert_to_numpy=True)
dim = vectors.shape[1]
index = faiss.IndexFlatL2(dim)
index.add(vectors)

# Label colors dictionary
label_colors = {}

def parse_bounding_box(response_text):
    """Parse bounding box coordinates and labels from the Gemini response."""
    bounding_boxes = re.findall(r'\[(\d+,\s*\d+,\s*\d+,\s*\d+,\s*[\w\s]+)\]', response_text)
    parsed_boxes = []

    for box in bounding_boxes:
        parts = box.split(',')
        numbers = list(map(int, parts[:-1]))  # Extract coordinates
        label = parts[-1].strip()  # Extract object name
        parsed_boxes.append((numbers, label))

    return parsed_boxes

def draw_bounding_boxes(image, bounding_boxes_with_labels):
    """Draw bounding boxes with labels on the image."""
    if image.mode != 'RGB':
        image = image.convert('RGB')

    image = np.array(image)  # Convert to NumPy array

    for bounding_box, label in bounding_boxes_with_labels:
        height, width = image.shape[:2]
        ymin, xmin, ymax, xmax = bounding_box

        # Convert normalized coordinates (0-1000) to actual image dimensions
        x1 = int(xmin / 1000 * width)
        y1 = int(ymin / 1000 * height)
        x2 = int(xmax / 1000 * width)
        y2 = int(ymax / 1000 * height)

        # Increase bounding box size slightly
        x1, y1, x2, y2 = max(0, x1 - 5), max(0, y1 - 5), min(width, x2 + 5), min(height, y2 + 5)

        # Assign random colors to labels
        if label not in label_colors:
            label_colors[label] = np.random.randint(0, 256, (3,)).tolist()
        color = label_colors[label]

        # Draw bounding box
        cv2.rectangle(image, (x1, y1), (x2, y2), color, 3)

        # Text label
        font = cv2.FONT_HERSHEY_SIMPLEX
        font_scale, thickness = 0.8, 2
        text_size = cv2.getTextSize(label, font, font_scale, thickness)[0]
        text_x, text_y = x1, max(0, y1 - 10)

        # Label background
        cv2.rectangle(image, (text_x, text_y - text_size[1] - 10), (text_x + text_size[0] + 10, text_y), color, -1)
        cv2.putText(image, label, (text_x + 5, text_y - 5), font, font_scale, (255, 255, 255), thickness)

    return Image.fromarray(image)
@app.route('/detect_objects', methods=['POST'])
def detect_objects():
    """Detect objects in an uploaded image using Gemini AI and return detected object labels and annotated image."""
    try:
        if 'image' not in request.files:
            return jsonify({"error": "No image file uploaded"}), 400

        image_file = request.files['image']
        img = Image.open(image_file)

        response = model.generate_content([
            img,
            "Return bounding boxes for all objects (no living beings) in the image as a list."
            "Format: [ymin, xmin, ymax, xmax, object_name]."
        ])

        bounding_boxes = parse_bounding_box(response.text)
        output_image = draw_bounding_boxes(img, bounding_boxes)

        # Save the annotated image
        output_path = "output_image.jpg"
        output_image.save(output_path)

        # Extract unique object labels
        unique_labels = list(set(label for _, label in bounding_boxes))

        return jsonify({
            "objects": ",".join(unique_labels),
            # "image_url": request.host_url + output_path  # Provide image URL
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/query', methods=['POST'])
def search():
    """Search for similar items in the dataset using FAISS and return the top matches."""
    try:
        data = request.get_json()
        queries = data.get('queries', [])

        if not queries or not isinstance(queries, list):
            return jsonify({"error": "A list of queries is required"}), 400

        # Encode queries
        query_vectors = encoder.encode(queries, convert_to_numpy=True)

        # Search FAISS index
        distances, indices = index.search(query_vectors, k=min(len(df), 10))  # Top 10 matches per query

        # Prepare response
        results = []
        for query, dists, idxs in zip(queries, distances, indices):
            query_results = [
                {
                    **df.iloc[idx].to_dict(),
                    "similarity_score": float(dist)
                }
                for idx, dist in zip(idxs, dists)
            ]
            query_results.sort(key=lambda x: x["similarity_score"])  # Sort results
            results.append({"query": query, "matches": query_results})

        return jsonify({"results": results})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)