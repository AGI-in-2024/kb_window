import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

export default function AssistantsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Chat Assistants</h1>
        <Link href="/admin/assistants/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Assistant
          </Button>
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Creation Date</TableHead>
            <TableHead>Associated Datasets</TableHead>
            <TableHead>Language</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>General Assistant</TableCell>
            <TableCell>2023-11-28</TableCell>
            <TableCell>General Knowledge</TableCell>
            <TableCell>English</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>
              <Button variant="outline" size="sm" className="mr-2">Edit</Button>
              <Button variant="destructive" size="sm">Delete</Button>
            </TableCell>
          </TableRow>
          {/* Add more rows as needed */}
        </TableBody>
      </Table>
    </div>
  )
}

