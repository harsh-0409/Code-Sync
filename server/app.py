from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

# Hardcoded Gemini API key (not recommended for production)
GEMINI_API_KEY = 'AIzaSyCPm1nSjI-CzQfBP6lo7bRHBAeykdhmfmc'

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({"error": "Message is required"}), 400
    
    try:
        response = requests.post(
            'https://generativelanguage.googleapis.com',  # Replace with the actual API endpoint
            headers={
                'Authorization': f'Bearer {GEMINI_API_KEY}',
                'Content-Type': 'application/json'
            },
            json={"message": user_message}
        )
        
        bot_response = response.json().get('response', "Sorry, I didn't understand that.")
        return jsonify({"response": bot_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500