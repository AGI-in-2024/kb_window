import Link from "next/link"
import { MessageCircle, Database, Settings } from 'lucide-react'

export function SideNav() {
  return (
    <nav className="w-64 bg-secondary text-secondary-foreground p-4">
      <ul className="space-y-2">
        <li>
          <Link href="/chat" className="flex items-center space-x-2 p-2 rounded hover:bg-primary/10">
            <MessageCircle size={20} />
            <span>Чат</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/assistants" className="flex items-center space-x-2 p-2 rounded hover:bg-primary/10">
            <Database size={20} />
            <span>Ассистенты</span>
          </Link>
        </li>
        <li>
          <Link href="/admin/datasets" className="flex items-center space-x-2 p-2 rounded hover:bg-primary/10">
            <Settings size={20} />
            <span>Наборы данных</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

