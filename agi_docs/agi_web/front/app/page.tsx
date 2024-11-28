import { MainNav } from "@/components/main-nav"
import { SideNav } from "@/components/side-nav"
import Link from "next/link"
import { MessageCircle, Database } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex h-screen flex-col">
      <MainNav />
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
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
      </main>
    </div>
  )
}
