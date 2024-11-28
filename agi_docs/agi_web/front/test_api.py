import requests
import json

# Configuration
API_URL = "http://localhost:9222/api/v1"
API_KEY = "ragflow-E3MTBmMTg2M2ExZDExZWY4NDg2MDI0Mm"
CHAT_ID = "0cf49e3aad8511efa9c7d843ae08a70a"

def test_create_chat():
    print("\nTesting create chat...")
    url = f"{API_URL}/chats"
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {API_KEY}'
    }
    payload = {
        "name": "test_chat",
        "dataset_ids": [],
        "llm": {
            "model_name": "qwen-plus@Tongyi-Qianwen",
            "temperature": 0.1,
            "top_p": 0.3,
            "presence_penalty": 0.2,
            "frequency_penalty": 0.7,
            "max_tokens": 512
        },
        "prompt": {
            "similarity_threshold": 0.2,
            "keywords_similarity_weight": 0.7,
            "top_n": 8,
            "variables": [{"key": "knowledge", "optional": true}],
            "empty_response": "Sorry! No relevant content was found!",
            "opener": "Hi! I am your assistant, can I help you?"
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        print(f"Status code: {response.status_code}")
        print(f"Response text: {response.text}")
        print(f"Request URL: {url}")
        print(f"Request headers: {headers}")
        print(f"Request payload: {json.dumps(payload, indent=2)}")
        return response.ok, response.json().get('data', {}).get('id') if response.ok else None
    except Exception as e:
        print(f"Error creating chat: {e}")
        return False, None

def test_send_message(chat_id, session_id=None):
    print("\nTesting send message...")
    url = f"{API_URL}/chats/{chat_id}/completions"
    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {API_KEY}'
    }
    payload = {
        "question": "What can you help me with?",
        "stream": False,
        "session_id": session_id
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        print(f"Status code: {response.status_code}")
        print(f"Response text: {response.text}")
        print(f"Request URL: {url}")
        print(f"Request headers: {headers}")
        print(f"Request payload: {json.dumps(payload, indent=2)}")
        return response.ok
    except Exception as e:
        print(f"Error sending message: {e}")
        return False

if __name__ == "__main__":
    print("Starting API tests...")
    print(f"Using API URL: {API_URL}")
    print(f"Using API Key: {API_KEY}")
    
    # Test chat creation
    chat_success, chat_id = test_create_chat()
    if chat_success and chat_id:
        print(f"Chat creation test: SUCCESS (ID: {chat_id})")
        
        # Test message sending without session
        if test_send_message(chat_id):
            print("Send message test: SUCCESS")
        else:
            print("Send message test: FAILED")
    else:
        print("Chat creation test: FAILED")