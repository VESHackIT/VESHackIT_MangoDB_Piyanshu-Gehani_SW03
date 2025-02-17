import cv2
import numpy as np
import random
import os

def embed_image_opencv(image_path, video_path, output_path, embed_size=(100, 100), placement="random"):
    """
    Embeds an image into a video frame using OpenCV.

    Args:
        image_path (str): Path to the image file.
        video_path (str): Path to the video file.
        output_path (str): Path to save the modified video.
        embed_size (tuple): Size of the embedded image (width, height).
        placement (str): Placement of the image ("random", "top-left", "center").
    """
    if not os.path.exists(image_path):
        print(f"Error: Image not found at '{image_path}'")
        return
    if not os.path.exists(video_path):
        print(f"Error: Video not found at '{video_path}'")
        return

    try:
        image = cv2.imread(image_path)
        if image is None:
            raise ValueError(f"Could not read image from {image_path}")
        image = cv2.resize(image, embed_size)
    except Exception as e:
        print(f"Error: Image processing failed: {e}")
        return

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print("Error: Could not open video.")
        return

    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))

    if frame_count <= 0:
        print("Error: Video has no frames or invalid duration.")
        cap.release()
        return

    target_frame_index = random.randint(0, frame_count - 1)

    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (frame_width, frame_height))

    current_frame_index = 0
    success, frame = cap.read()
    while success:
        if current_frame_index == target_frame_index:
            image_height, image_width, _ = image.shape

            if placement == "top-left":
                start_y, start_x = 0, 0
            elif placement == "center":
                start_y = (frame_height - image_height) // 2
                start_x = (frame_width - image_width) // 2
            else:  # random
                start_y = random.randint(0, frame_height - image_height)
                start_x = random.randint(0, frame_width - image_width)

            frame[start_y:start_y + image_height, start_x:start_x + image_width] = image

        out.write(frame)
        current_frame_index += 1
        success, frame = cap.read()

    cap.release()
    out.release()
    print(f"Image embedded. Video saved to: {output_path}")

# Example Usage
embed_image_opencv("/content/test.jpg", "/content/sample.mp4", "/content/modified_video.mp4", placement="random")