import { MainNav } from "@/components/main-nav"
import { SideNav } from "@/components/side-nav"
import Link from "next/link"
import { MessageCircle, Database, Settings } from 'lucide-react'
import { getConfig } from '@/lib/config'

export default function Home() {
  const config = getConfig()
  
  return (
    <div className="flex h-screen flex-col">
      <MainNav />
      <div className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h3 className="font-semibold text-sm">RagFlow ID</h3>
            <p className="mt-2 text-2xl font-bold">{config.ragflowId}</p>
            <p className="text-sm text-muted-foreground">Active Configuration</p>
          </div>
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h3 className="font-semibold text-sm">API Endpoint</h3>
            <p className="mt-2 text-2xl font-bold">{config.apiUrl}</p>
            <p className="text-sm text-muted-foreground">Connected</p>
          </div>
          <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <h3 className="font-semibold text-sm">Workflow Status</h3>
            <p className="mt-2 text-2xl font-bold">{config.workflowId}</p>
            <p className="text-sm text-muted-foreground">Active</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/chat" className="group relative overflow-hidden rounded-lg border p-8 hover:border-foreground/50 transition-colors">
            <div className="flex flex-col items-center justify-center space-y-4">
              <MessageCircle className="h-12 w-12" />
              <h2 className="text-2xl font-bold">Чат-интерфейс</h2>
              <p className="text-center text-muted-foreground">
                Начните разговор с ИИ-ассистентами, используя наш продвинутый чат-интерфейс
              </p>
            </div>
          </Link>
          <Link href="/admin/assistants" className="group relative overflow-hidden rounded-lg border p-8 hover:border-foreground/50 transition-colors">
            <div className="flex flex-col items-center justify-center space-y-4">
              <Database className="h-12 w-12" />
              <h2 className="text-2xl font-bold">Панель администратора</h2>
              <p className="text-center text-muted-foreground">
                Управление ассистентами, наборами данных и настройками системы
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
