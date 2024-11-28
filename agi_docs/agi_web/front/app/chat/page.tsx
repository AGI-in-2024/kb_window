"use client"

import { useState } from "react"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface Message {
  role: 'assistant' | 'user'
  content: string
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Здравствуйте! Как я могу вам помочь?' }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sessions = [
    { id: 'current', name: 'Текущая сессия', active: true },
    { id: 'prev1', name: 'Предыдущая сессия 1', active: false },
    { id: 'prev2', name: 'Предыдущая сессия 2', active: false },
  ]

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    try {
      setIsLoading(true)
      // Add user message
      const userMessage = { role: 'user' as const, content: input }
      setMessages(prev => [...prev, userMessage])
      setInput('')

      // Call API endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })

      if (!response.ok) throw new Error('Не удалось отправить сообщение')

      const data = await response.json()
      
      // Add assistant response
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch (error) {
      console.error('Ошибка чата:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-screen flex-col">
      <MainNav />
      <div className="flex flex-1 overflow-hidden">
        {/* Sessions sidebar */}
        <aside className="w-64 border-r bg-muted/40">
          <div className="p-4 font-semibold">Сессии</div>
          <ScrollArea className="h-full">
            {sessions.map(session => (
              <button
                key={session.id}
                className={cn(
                  "w-full p-4 text-left hover:bg-muted/60",
                  session.active && "bg-muted"
                )}
              >
                {session.name}
              </button>
            ))}
          </ScrollArea>
        </aside>

        {/* Chat area */}
        <main className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-start gap-3",
                    message.role === 'user' && "flex-row-reverse"
                  )}
                >
                  <Avatar>
                    <AvatarFallback>
                      {message.role === 'user' ? 'П' : 'A'}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={cn(
                      "rounded-lg px-4 py-2 max-w-[80%]",
                      message.role === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message input */}
          <form onSubmit={sendMessage} className="border-t p-4">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Введите ваше сообщение..."
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Отправка...' : 'Отправить'}
              </Button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}

