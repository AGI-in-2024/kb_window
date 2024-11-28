Create chat assistant
POST /api/v1/chats

Creates a chat assistant.

Request
Method: POST
URL: /api/v1/chats
Headers:
'content-Type: application/json'
'Authorization: Bearer <YOUR_API_KEY>'
Body:
"name": string
"avatar": string
"dataset_ids": list[string]
"llm": object
"prompt": object
Request example
curl --request POST \
     --url http://{address}/api/v1/chats \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>'
     --data '{
    "dataset_ids": ["0b2cbc8c877f11ef89070242ac120005"],
    "name":"new_chat_1"
}'

Request parameters
"name": (Body parameter), string, Required
The name of the chat assistant.
"avatar": (Body parameter), string
Base64 encoding of the avatar.
"dataset_ids": (Body parameter), list[string]
The IDs of the associated datasets.
"llm": (Body parameter), object
The LLM settings for the chat assistant to create. If it is not explicitly set, a JSON object with the following values will be generated as the default. An llm JSON object contains the following attributes:
"model_name", string
The chat model name. If not set, the user's default chat model will be used.
"temperature": float
Controls the randomness of the model's predictions. A lower temperature increases the model's confidence in its responses; a higher temperature increases creativity and diversity. Defaults to 0.1.
"top_p": float
Also known as “nucleus sampling”, this parameter sets a threshold to select a smaller set of words to sample from. It focuses on the most likely words, cutting off the less probable ones. Defaults to 0.3
"presence_penalty": float
This discourages the model from repeating the same information by penalizing words that have already appeared in the conversation. Defaults to 0.2.
"frequency penalty": float
Similar to the presence penalty, this reduces the model’s tendency to repeat the same words frequently. Defaults to 0.7.
"max_token": integer
The maximum length of the model’s output, measured in the number of tokens (words or pieces of words). Defaults to 512.
"prompt": (Body parameter), object
Instructions for the LLM to follow. If it is not explicitly set, a JSON object with the following values will be generated as the default. A prompt JSON object contains the following attributes:
"similarity_threshold": float RAGFlow employs either a combination of weighted keyword similarity and weighted vector cosine similarity, or a combination of weighted keyword similarity and weighted reranking score during retrieval. This argument sets the threshold for similarities between the user query and chunks. If a similarity score falls below this threshold, the corresponding chunk will be excluded from the results. The default value is 0.2.
"keywords_similarity_weight": float This argument sets the weight of keyword similarity in the hybrid similarity score with vector cosine similarity or reranking model similarity. By adjusting this weight, you can control the influence of keyword similarity in relation to other similarity measures. The default value is 0.7.
"top_n": int This argument specifies the number of top chunks with similarity scores above the similarity_threshold that are fed to the LLM. The LLM will only access these 'top N' chunks. The default value is 8.
"variables": object[] This argument lists the variables to use in the 'System' field of Chat Configurations. Note that:
"knowledge" is a reserved variable, which represents the retrieved chunks.
All the variables in 'System' should be curly bracketed.
The default value is [{"key": "knowledge", "optional": true}].
"rerank_model": string If it is not specified, vector cosine similarity will be used; otherwise, reranking score will be used.
"empty_response": string If nothing is retrieved in the dataset for the user's question, this will be used as the response. To allow the LLM to improvise when nothing is found, leave this blank.
"opener": string The opening greeting for the user. Defaults to "Hi! I am your assistant, can I help you?".
"show_quote: boolean Indicates whether the source of text should be displayed. Defaults to true.
"prompt": string The prompt content.
Response
Success:

{
    "code": 0,
    "data": {
        "avatar": "",
        "create_date": "Thu, 24 Oct 2024 11:18:29 GMT",
        "create_time": 1729768709023,
        "dataset_ids": [
            "527fa74891e811ef9c650242ac120006"
        ],
        "description": "A helpful Assistant",
        "do_refer": "1",
        "id": "b1f2f15691f911ef81180242ac120003",
        "language": "English",
        "llm": {
            "frequency_penalty": 0.7,
            "max_tokens": 512,
            "model_name": "qwen-plus@Tongyi-Qianwen",
            "presence_penalty": 0.4,
            "temperature": 0.1,
            "top_p": 0.3
        },
        "name": "12234",
        "prompt": {
            "empty_response": "Sorry! No relevant content was found in the knowledge base!",
            "keywords_similarity_weight": 0.3,
            "opener": "Hi! I'm your assistant, what can I do for you?",
            "prompt": "You are an intelligent assistant. Please summarize the content of the knowledge base to answer the question. Please list the data in the knowledge base and answer in detail. When all knowledge base content is irrelevant to the question, your answer must include the sentence \"The answer you are looking for is not found in the knowledge base!\" Answers need to consider chat history.\n ",
            "rerank_model": "",
            "similarity_threshold": 0.2,
            "top_n": 6,
            "variables": [
                {
                    "key": "knowledge",
                    "optional": false
                }
            ]
        },
        "prompt_type": "simple",
        "status": "1",
        "tenant_id": "69736c5e723611efb51b0242ac120007",
        "top_k": 1024,
        "update_date": "Thu, 24 Oct 2024 11:18:29 GMT",
        "update_time": 1729768709023
    }
}


Failure:

{
    "code": 102,
    "message": "Duplicated chat name in creating dataset."
}

Update chat assistant
PUT /api/v1/chats/{chat_id}

Updates configurations for a specified chat assistant.

Request
Method: PUT
URL: /api/v1/chats/{chat_id}
Headers:
'content-Type: application/json'
'Authorization: Bearer <YOUR_API_KEY>'
Body:
"name": string
"avatar": string
"dataset_ids": list[string]
"llm": object
"prompt": object
Request example
curl --request PUT \
     --url http://{address}/api/v1/chats/{chat_id} \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "name":"Test"
     }'

Parameters
chat_id: (Path parameter)
The ID of the chat assistant to update.
"name": (Body parameter), string, Required
The revised name of the chat assistant.
"avatar": (Body parameter), string
Base64 encoding of the avatar.
"dataset_ids": (Body parameter), list[string]
The IDs of the associated datasets.
"llm": (Body parameter), object
The LLM settings for the chat assistant to create. If it is not explicitly set, a dictionary with the following values will be generated as the default. An llm object contains the following attributes:
"model_name", string
The chat model name. If not set, the user's default chat model will be used.
"temperature": float
Controls the randomness of the model's predictions. A lower temperature increases the model's confidence in its responses; a higher temperature increases creativity and diversity. Defaults to 0.1.
"top_p": float
Also known as “nucleus sampling”, this parameter sets a threshold to select a smaller set of words to sample from. It focuses on the most likely words, cutting off the less probable ones. Defaults to 0.3
"presence_penalty": float
This discourages the model from repeating the same information by penalizing words that have already appeared in the conversation. Defaults to 0.2.
"frequency penalty": float
Similar to the presence penalty, this reduces the model’s tendency to repeat the same words frequently. Defaults to 0.7.
"max_token": integer
The maximum length of the model’s output, measured in the number of tokens (words or pieces of words). Defaults to 512.
"prompt": (Body parameter), object
Instructions for the LLM to follow. A prompt object contains the following attributes:
"similarity_threshold": float RAGFlow employs either a combination of weighted keyword similarity and weighted vector cosine similarity, or a combination of weighted keyword similarity and weighted rerank score during retrieval. This argument sets the threshold for similarities between the user query and chunks. If a similarity score falls below this threshold, the corresponding chunk will be excluded from the results. The default value is 0.2.
"keywords_similarity_weight": float This argument sets the weight of keyword similarity in the hybrid similarity score with vector cosine similarity or reranking model similarity. By adjusting this weight, you can control the influence of keyword similarity in relation to other similarity measures. The default value is 0.7.
"top_n": int This argument specifies the number of top chunks with similarity scores above the similarity_threshold that are fed to the LLM. The LLM will only access these 'top N' chunks. The default value is 8.
"variables": object[] This argument lists the variables to use in the 'System' field of Chat Configurations. Note that:
"knowledge" is a reserved variable, which represents the retrieved chunks.
All the variables in 'System' should be curly bracketed.
The default value is [{"key": "knowledge", "optional": true}]
"rerank_model": string If it is not specified, vector cosine similarity will be used; otherwise, reranking score will be used.
"empty_response": string If nothing is retrieved in the dataset for the user's question, this will be used as the response. To allow the LLM to improvise when nothing is found, leave this blank.
"opener": string The opening greeting for the user. Defaults to "Hi! I am your assistant, can I help you?".
"show_quote: boolean Indicates whether the source of text should be displayed. Defaults to true.
"prompt": string The prompt content.
Response
Success:

{
    "code": 0
}

Failure:

{
    "code": 102,
    "message": "Duplicated chat name in updating dataset."
}

Delete chat assistants
DELETE /api/v1/chats

Deletes chat assistants by ID.

Request
Method: DELETE
URL: /api/v1/chats
Headers:
'content-Type: application/json'
'Authorization: Bearer <YOUR_API_KEY>'
Body:
"ids": list[string]
Request example
curl --request DELETE \
     --url http://{address}/api/v1/chats \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "ids": ["test_1", "test_2"]
     }'

Request parameters
"ids": (Body parameter), list[string]
The IDs of the chat assistants to delete. If it is not specified, all chat assistants in the system will be deleted.
Response
Success:

{
    "code": 0
}

Failure:

{
    "code": 102,
    "message": "ids are required"
}

List chat assistants
GET /api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={chat_name}&id={chat_id}

Lists chat assistants.

Request
Method: GET
URL: /api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={dataset_name}&id={dataset_id}
Headers:
'Authorization: Bearer <YOUR_API_KEY>'
Request example
curl --request GET \
     --url http://{address}/api/v1/chats?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={dataset_name}&id={dataset_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'


Request parameters
page: (Filter parameter), integer
Specifies the page on which the chat assistants will be displayed. Defaults to 1.
page_size: (Filter parameter), integer
The number of chat assistants on each page. Defaults to 30.
orderby: (Filter parameter), string
The attribute by which the results are sorted. Available options:
create_time (default)
update_time
desc: (Filter parameter), boolean
Indicates whether the retrieved chat assistants should be sorted in descending order. Defaults to true.
id: (Filter parameter), string
The ID of the chat assistant to retrieve.
name: (Filter parameter), string
The name of the chat assistant to retrieve.
Response
Success:

{
    "code": 0,
    "data": [
        {
            "avatar": "",
            "create_date": "Fri, 18 Oct 2024 06:20:06 GMT",
            "create_time": 1729232406637,
            "description": "A helpful Assistant",
            "do_refer": "1",
            "id": "04d0d8e28d1911efa3630242ac120006",
            "dataset_ids": ["527fa74891e811ef9c650242ac120006"],
            "language": "English",
            "llm": {
                "frequency_penalty": 0.7,
                "max_tokens": 512,
                "model_name": "qwen-plus@Tongyi-Qianwen",
                "presence_penalty": 0.4,
                "temperature": 0.1,
                "top_p": 0.3
            },
            "name": "13243",
            "prompt": {
                "empty_response": "Sorry! No relevant content was found in the knowledge base!",
                "keywords_similarity_weight": 0.3,
                "opener": "Hi! I'm your assistant, what can I do for you?",
                "prompt": "You are an intelligent assistant. Please summarize the content of the knowledge base to answer the question. Please list the data in the knowledge base and answer in detail. When all knowledge base content is irrelevant to the question, your answer must include the sentence \"The answer you are looking for is not found in the knowledge base!\" Answers need to consider chat history.\n",
                "rerank_model": "",
                "similarity_threshold": 0.2,
                "top_n": 6,
                "variables": [
                    {
                        "key": "knowledge",
                        "optional": false
                    }
                ]
            },
            "prompt_type": "simple",
            "status": "1",
            "tenant_id": "69736c5e723611efb51b0242ac120007",
            "top_k": 1024,
            "update_date": "Fri, 18 Oct 2024 06:20:06 GMT",
            "update_time": 1729232406638
        }
    ]
}


Failure:

{
    "code": 102,
    "message": "The chat doesn't exist"
}

Create session with chat assistant
POST /api/v1/chats/{chat_id}/sessions

Creates a session with a chat assistant.

Request
Method: POST
URL: /api/v1/chats/{chat_id}/sessions
Headers:
'content-Type: application/json'
'Authorization: Bearer <YOUR_API_KEY>'
Body:
"name": string
Request example
curl --request POST \
     --url http://{address}/api/v1/chats/{chat_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "name": "new session"
     }'

Request parameters
chat_id: (Path parameter)
The ID of the associated chat assistant.
"name": (Body parameter), string
The name of the chat session to create.
Response
Success:

{
    "code": 0,
    "data": {
        "chat_id": "2ca4b22e878011ef88fe0242ac120005",
        "create_date": "Fri, 11 Oct 2024 08:46:14 GMT",
        "create_time": 1728636374571,
        "id": "4606b4ec87ad11efbc4f0242ac120006",
        "messages": [
            {
                "content": "Hi! I am your assistant，can I help you?",
                "role": "assistant"
            }
        ],
        "name": "new session",
        "update_date": "Fri, 11 Oct 2024 08:46:14 GMT",
        "update_time": 1728636374571
    }
}

Failure:

{
    "code": 102,
    "message": "Name can not be empty."
}

Update session
PUT /api/v1/chats/{chat_id}/sessions/{session_id}

Updates a session of a specified chat assistant.

Request
Method: PUT
URL: /api/v1/chats/{chat_id}/sessions/{session_id}
Headers:
'content-Type: application/json'
'Authorization: Bearer <YOUR_API_KEY>'
Body:
"name: string
Request example
curl --request PUT \
     --url http://{address}/api/v1/chats/{chat_id}/sessions/{session_id} \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "name": "<REVISED_SESSION_NAME_HERE>"
     }'

Request Parameter
chat_id: (Path parameter)
The ID of the associated chat assistant.
session_id: (Path parameter)
The ID of the session to update.
"name": (*Body Parameter), string
The revised name of the session.
Response
Success:

{
    "code": 0
}

Failure:

{
    "code": 102,
    "message": "Name cannot be empty."
}

List sessions
GET /api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}

Lists sessions associated with a specified chat assistant.

Request
Method: GET
URL: /api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id}
Headers:
'Authorization: Bearer <YOUR_API_KEY>'
Request example
curl --request GET \
     --url http://{address}/api/v1/chats/{chat_id}/sessions?page={page}&page_size={page_size}&orderby={orderby}&desc={desc}&name={session_name}&id={session_id} \
     --header 'Authorization: Bearer <YOUR_API_KEY>'


Request Parameters
chat_id: (Path parameter)
The ID of the associated chat assistant.
page: (Filter parameter), integer
Specifies the page on which the sessions will be displayed. Defaults to 1.
page_size: (Filter parameter), integer
The number of sessions on each page. Defaults to 30.
orderby: (Filter parameter), string
The field by which sessions should be sorted. Available options:
create_time (default)
update_time
desc: (Filter parameter), boolean
Indicates whether the retrieved sessions should be sorted in descending order. Defaults to true.
name: (Filter parameter) string
The name of the chat session to retrieve.
id: (Filter parameter), string
The ID of the chat session to retrieve.
Response
Success:

{
    "code": 0,
    "data": [
        {
            "chat": "2ca4b22e878011ef88fe0242ac120005",
            "create_date": "Fri, 11 Oct 2024 08:46:43 GMT",
            "create_time": 1728636403974,
            "id": "578d541e87ad11ef96b90242ac120006",
            "messages": [
                {
                    "content": "Hi! I am your assistant，can I help you?",
                    "role": "assistant"
                }
            ],
            "name": "new session",
            "update_date": "Fri, 11 Oct 2024 08:46:43 GMT",
            "update_time": 1728636403974
        }
    ]
}

Failure:

{
    "code": 102,
    "message": "The session doesn't exist"
}

Delete sessions
DELETE /api/v1/chats/{chat_id}/sessions

Deletes sessions of a chat assistant by ID.

Request
Method: DELETE
URL: /api/v1/chats/{chat_id}/sessions
Headers:
'content-Type: application/json'
'Authorization: Bearer <YOUR_API_KEY>'
Body:
"ids": list[string]
Request example
# Either id or name must be provided, but not both.
curl --request DELETE \
     --url http://{address}/api/v1/chats/{chat_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '
     {
          "ids": ["test_1", "test_2"]
     }'

Request Parameters
chat_id: (Path parameter)
The ID of the associated chat assistant.
"ids": (Body Parameter), list[string]
The IDs of the sessions to delete. If it is not specified, all sessions associated with the specified chat assistant will be deleted.
Response
Success:

{
    "code": 0
}

Failure:

{
    "code": 102,
    "message": "The chat doesn't own the session"
}

Converse with chat assistant
POST /api/v1/chats/{chat_id}/completions

Asks a specified chat assistant a question to start an AI-powered conversation.

NOTE
In streaming mode, not all responses include a reference, as this depends on the system's judgement.

In streaming mode, the last message is an empty message:

data:
{
  "code": 0,
  "data": true
}

Request
Method: POST
URL: /api/v1/chats/{chat_id}/completions
Headers:
'content-Type: application/json'
'Authorization: Bearer <YOUR_API_KEY>'
Body:
"question": string
"stream": boolean
"session_id": string
Request example
curl --request POST \
     --url http://{address}/api/v1/chats/{chat_id}/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data-binary '
     {
          "question": "What is RAGFlow?",
          "stream": true
     }'

Request Parameters
chat_id: (Path parameter)
The ID of the associated chat assistant.
"question": (Body Parameter), string, Required
The question to start an AI-powered conversation.
"stream": (Body Parameter), boolean
Indicates whether to output responses in a streaming way:
true: Enable streaming (default).
false: Disable streaming.
"session_id": (Body Parameter)
The ID of session. If it is not provided, a new session will be generated.
Response
Success:

data:{
    "code": 0,
    "data": {
        "answer": "I am an intelligent assistant designed to help answer questions by summarizing content from a",
        "reference": {},
        "audio_binary": null,
        "id": "a84c5dd4-97b4-4624-8c3b-974012c8000d",
        "session_id": "82b0ab2a9c1911ef9d870242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "I am an intelligent assistant designed to help answer questions by summarizing content from a knowledge base. My responses are based on the information available in the knowledge base and",
        "reference": {},
        "audio_binary": null,
        "id": "a84c5dd4-97b4-4624-8c3b-974012c8000d",
        "session_id": "82b0ab2a9c1911ef9d870242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "I am an intelligent assistant designed to help answer questions by summarizing content from a knowledge base. My responses are based on the information available in the knowledge base and any relevant chat history.",
        "reference": {},
        "audio_binary": null,
        "id": "a84c5dd4-97b4-4624-8c3b-974012c8000d",
        "session_id": "82b0ab2a9c1911ef9d870242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "I am an intelligent assistant designed to help answer questions by summarizing content from a knowledge base ##0$$. My responses are based on the information available in the knowledge base and any relevant chat history.",
        "reference": {
            "total": 1,
            "chunks": [
                {
                    "id": "faf26c791128f2d5e821f822671063bd",
                    "content": "xxxxxxxx",
                    "document_id": "dd58f58e888511ef89c90242ac120006",
                    "document_name": "1.txt",
                    "dataset_id": "8e83e57a884611ef9d760242ac120006",
                    "image_id": "",
                    "similarity": 0.7,
                    "vector_similarity": 0.0,
                    "term_similarity": 1.0,
                    "positions": [
                        ""
                    ]
                }
            ],
            "doc_aggs": [
                {
                    "doc_name": "1.txt",
                    "doc_id": "dd58f58e888511ef89c90242ac120006",
                    "count": 1
                }
            ]
        },
        "prompt": "xxxxxxxxxxx",
        "id": "a84c5dd4-97b4-4624-8c3b-974012c8000d",
        "session_id": "82b0ab2a9c1911ef9d870242ac120006"
    }
}
data:{
    "code": 0,
    "data": true
}


Failure:

{
    "code": 102,
    "message": "Please input your question."
}

Create session with agent
POST /api/v1/agents/{agent_id}/sessions

Creates a session with an agent.

Request
Method: POST
URL: /api/v1/agents/{agent_id}/sessions
Headers:
'content-Type: application/json'
'Authorization: Bearer <YOUR_API_KEY>'
Body:
Request example
curl --request POST \
     --url http://{address}/api/v1/agents/{agent_id}/sessions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data '{
     }'

Request parameters
agent_id: (Path parameter)
The ID of the associated agent assistant.
Response
Success:

{
    "code": 0,
    "data": {
        "agent_id": "2e45b5209c1011efa3e90242ac120006",
        "id": "7869e9e49c1711ef92840242ac120006",
        "message": [
            {
                "content": "Hello! I am a recruiter at InfiniFlow. I learned that you are an expert in the field, and took the liberty of reaching out to you. There is an opportunity I would like to share with you. RAGFlow is currently looking for a senior engineer for your position. I was wondering if you might be interested?",
                "role": "assistant"
            }
        ],
        "source": "agent",
        "user_id": ""
    }
}


Failure:

{
    "code": 102,
    "message": "Agent not found."
}

Converse with agent
POST /api/v1/agents/{agent_id}/completions

Asks a specified agent a question to start an AI-powered conversation.

NOTE
In streaming mode, not all responses include a reference, as this depends on the system's judgement.

In streaming mode, the last message is an empty message:

data:
{
  "code": 0,
  "data": true
}

Request
Method: POST
URL: /api/v1/agents/{agent_id}/completions
Headers:
'content-Type: application/json'
'Authorization: Bearer <YOUR_API_KEY>'
Body:
"question": string
"stream": boolean
"session_id": string
Request example
curl --request POST \
     --url http://{address}/api/v1/agents/{agent_id}/completions \
     --header 'Content-Type: application/json' \
     --header 'Authorization: Bearer <YOUR_API_KEY>' \
     --data-binary '
     {
          "question": "What is RAGFlow?",
          "stream": true
     }'

Request Parameters
agent_id: (Path parameter), string
The ID of the associated agent assistant.
"question": (Body Parameter), string, Required
The question to start an AI-powered conversation.
"stream": (Body Parameter), boolean
Indicates whether to output responses in a streaming way:
true: Enable streaming (default).
false: Disable streaming.
"session_id": (Body Parameter)
The ID of the session. If it is not provided, a new session will be generated.
Response
Success:

data:{
    "code": 0,
    "message": "",
    "data": {
        "answer": "",
        "reference": [],
        "id": "7ed5c2e4-aa28-4397-bbed-59664a332aa0",
        "session_id": "ce1b4fa89c1811ef85720242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "Hello",
        "reference": [],
        "id": "7ed5c2e4-aa28-4397-bbed-59664a332aa0",
        "session_id": "ce1b4fa89c1811ef85720242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "Hello!",
        "reference": [],
        "id": "7ed5c2e4-aa28-4397-bbed-59664a332aa0",
        "session_id": "ce1b4fa89c1811ef85720242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "Hello! How",
        "reference": [],
        "id": "7ed5c2e4-aa28-4397-bbed-59664a332aa0",
        "session_id": "ce1b4fa89c1811ef85720242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "Hello! How can",
        "reference": [],
        "id": "7ed5c2e4-aa28-4397-bbed-59664a332aa0",
        "session_id": "ce1b4fa89c1811ef85720242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "Hello! How can I",
        "reference": [],
        "id": "7ed5c2e4-aa28-4397-bbed-59664a332aa0",
        "session_id": "ce1b4fa89c1811ef85720242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "Hello! How can I assist",
        "reference": [],
        "id": "7ed5c2e4-aa28-4397-bbed-59664a332aa0",
        "session_id": "ce1b4fa89c1811ef85720242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "Hello! How can I assist you",
        "reference": [],
        "id": "7ed5c2e4-aa28-4397-bbed-59664a332aa0",
        "session_id": "ce1b4fa89c1811ef85720242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "Hello! How can I assist you today",
        "reference": [],
        "id": "7ed5c2e4-aa28-4397-bbed-59664a332aa0",
        "session_id": "ce1b4fa89c1811ef85720242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "Hello! How can I assist you today?",
        "reference": [],
        "id": "7ed5c2e4-aa28-4397-bbed-59664a332aa0",
        "session_id": "ce1b4fa89c1811ef85720242ac120006"
    }
}
data:{
    "code": 0,
    "data": {
        "answer": "Hello! How can I assist you today?",
        "reference": [],
        "id": "7ed5c2e4-aa28-4397-bbed-59664a332aa0",
        "session_id": "ce1b4fa89c1811ef85720242ac120006"
    }
}
data:{
    "code": 0,
    "data": true
}

Failure:

{
    "code": 102,
    "message": "`question` is required."
}

