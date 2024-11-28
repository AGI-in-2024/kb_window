"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function CreateAssistantPage() {
  const [temperature, setTemperature] = useState(0.1)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Create Chat Assistant</h1>
      <form className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" placeholder="Assistant Name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="avatar">Avatar (Base64)</Label>
          <Input id="avatar" type="file" accept="image/*" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="datasets">Dataset IDs</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select datasets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General Knowledge</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              <SelectItem value="history">History</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="model">Model Selection</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-3.5-turbo">GPT-3.5 Turbo</SelectItem>
              <SelectItem value="gpt-4">GPT-4</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Temperature</Label>
          <Slider
            min={0}
            max={1}
            step={0.1}
            value={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
          />
          <span className="text-sm text-muted-foreground">{temperature}</span>
        </div>
        <div className="space-y-2">
          <Label htmlFor="prompt">Custom Prompt Template</Label>
          <Textarea id="prompt" placeholder="Enter custom prompt template" />
        </div>
        <Button type="submit">Create Assistant</Button>
      </form>
    </div>
  )
}

