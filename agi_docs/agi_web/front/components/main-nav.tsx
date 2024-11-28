import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"

export function MainNav() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-2xl font-bold">
        RAGFlow
      </Link>
      <ModeToggle />
    </header>
  )
}

