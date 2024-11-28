import { NextResponse } from 'next/server'
import { getConfig } from '@/lib/config'

export async function POST(request: Request) {
  try {
    const config = getConfig()
    const { message } = await request.json()

    // First, create a chat if we don't have one
    const createChatResponse = await fetch(`${config.apiUrl}/chats`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.ragflowId}`
      },
      body: JSON.stringify({
        name: 'web_chat',
        dataset_ids: [],
        llm: {
          model_name: 'qwen-plus@Tongyi-Qianwen',
          temperature: 0.1,
          top_p: 0.3,
          presence_penalty: 0.2,
          frequency_penalty: 0.7,
          max_tokens: 512
        }
      })
    })

    if (!createChatResponse.ok) {
      console.error('Failed to create chat:', await createChatResponse.text())
      throw new Error('Failed to create RagFlow chat')
    }

    const chatData = await createChatResponse.json()
    const chatId = chatData.data.id

    // Create a session
    const createSessionResponse = await fetch(`${config.apiUrl}/chats/${chatId}/sessions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.ragflowId}`
      },
      body: JSON.stringify({
        name: 'web_session'
      })
    })

    if (!createSessionResponse.ok) {
      console.error('Failed to create session:', await createSessionResponse.text())
      throw new Error('Failed to create RagFlow session')
    }

    const sessionData = await createSessionResponse.json()
    const sessionId = sessionData.data.id

    // Send the message
    const messageResponse = await fetch(`${config.apiUrl}/chats/${chatId}/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${config.ragflowId}`
      },
      body: JSON.stringify({
        question: message,
        session_id: sessionId,
        stream: false
      })
    })

    if (!messageResponse.ok) {
      console.error('Failed to send message:', await messageResponse.text())
      throw new Error('Failed to send message to RagFlow')
    }

    const data = await messageResponse.json()
    
    return NextResponse.json({ response: data.data.answer })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    )
  }
} 