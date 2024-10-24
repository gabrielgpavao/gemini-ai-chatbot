"use client";

import { useChat } from 'ai/react'
import { SendIcon, SparklesIcon } from 'lucide-react'

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export function Chatbot() {
  const {
	messages,
	input,
	handleInputChange,
	handleSubmit,
  } = useChat({
    api: "api/chat",
  })

  return (
    <div className="flex flex-col h-full max-h-[90vh] w-full max-w-[43.75rem] mx-auto bg-background rounded-lg shadow-lg">
      <div className="flex-1 overflow-auto p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) =>
		    message.role === "user"
			  ? <UserMessage key={message.id} content={message.content} />
			  : <BotMessage key={message.id} content={message.content} />
		  )}
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
		className="bg-muted/50 px-4 py-3 flex items-center gap-2"
      >
        <div className="relative flex-1">
          <Textarea
            placeholder="Type your message..."
            className="rounded-lg border-none focus:ring-0 pr-12 min-h-[64px]"
            rows={2}
			value={input}
			onChange={handleInputChange}
          />

          <Button
		    type="submit"
			size="icon"
			className="absolute bottom-3 right-3 rounded-full"
			disabled={!input}
          >
            <SendIcon className="w-5 h-5" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </div>
  )
}

function UserMessage({ content }: { content: string }) {
  return (
	<div className="flex justify-end">
      <div className="bg-primary rounded-lg p-3 max-w-[70%]">
        <p className="text-sm text-primary-foreground">
          {content}
        </p>
      </div>
    </div>
  )
}

function BotMessage({ content }: { content: string }) {
  return (
	<div className="flex items-center gap-3">
      <div className='p-2 border border-gray-700 rounded-full'>
        <SparklesIcon className='size-5 text-primary' fill='currentColor' />
      </div>

      <div className="bg-muted rounded-lg p-3 max-w-[70%]">
        <p className="text-sm text-muted-foreground">{content}</p>
      </div>
    </div>
  )
}
