import React, { useState } from 'react'

const SYSTEM_PROMPT = `You are a friendly financial services assistant.
- Use simple, plain language.
- Explain banking terms, loans, fraud alerts, and online security best practices.
- Keep answers concise with short paragraphs or bullets.
- Include brief source citations when relevant (e.g., FTC, FDIC, Investopedia).
- Do not give personalized financial advice.
- Add a short disclaimer: This is general information, not financial advice.`

function MessageBubble({ role, content }) {
  const isUser = role === 'user'
  const assistantAvatar = 'https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Fintech'
  const containerClass = isUser
    ? 'flex items-start gap-3 flex-row-reverse text-right'
    : 'flex items-start gap-3'
  const bubbleClass = isUser
    ? 'max-w-[80%] rounded-2xl px-4 py-3 bg-brand-500 text-white whitespace-pre-wrap break-words'
    : 'max-w-[80%] rounded-2xl px-4 py-3 bg-zinc-900 border border-zinc-800 whitespace-pre-wrap break-words'
  const avatarClass = isUser
    ? 'h-7 w-7 rounded-full bg-brand-500 text-white'
    : 'h-7 w-7 rounded-full bg-zinc-800'

  return (
    <div className={containerClass}>
      {isUser ? (
        <div className={avatarClass} />
      ) : (
        <img
          src={assistantAvatar}
          alt="AI"
          className="h-7 w-7 rounded-full object-cover bg-zinc-800 border border-zinc-700"
        />
      )}
      <div className={bubbleClass}>{content}</div>
    </div>
  )
}

async function fetchChatCompletion({ apiKey, messages, model = 'gpt-4o-mini', temperature = 0.2 }) {
  if (!apiKey) {
    throw new Error('Missing API key. Add it in the header input.')
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify({ model, messages, temperature })
  })

  if (!response.ok) {
    const txt = await response.text()
    throw new Error('OpenAI error (' + response.status + '): ' + txt)
  }

  const data = await response.json()
  const first = data && data.choices && data.choices[0] && data.choices[0].message
    ? data.choices[0].message.content
    : ''
  return first ? first.trim() : 'No response.'
}

function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm your financial services assistant. Ask me about banking terms, loans, fraud alerts, or online security." }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY

  if (!apiKey) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-xl font-semibold mb-4">Configuration Error</h2>
          <p>Please set up the VITE_OPENAI_API_KEY environment variable in your hosting provider's settings.</p>
          <p className="text-sm text-zinc-400 mt-2">
            If you're the developer, check your hosting provider's environment variables configuration.
          </p>
        </div>
      </div>
    )
  }

  function handleClear() {
    setMessages([{ role: 'assistant', content: 'Chat cleared. Ask another question.' }])
  }

  async function handleSend(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const newMessages = [...messages, { role: 'user', content: text }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const reply = await fetchChatCompletion({
        apiKey,
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...newMessages
        ],
        temperature: 0.2
      })
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Error: ' + err.message }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen min-w-[900px] flex flex-col">
      <header className="border-b border-zinc-800 bg-zinc-900">
        <div className="mx-auto w-[900px] py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-brand-500 text-white grid place-items-center font-semibold">F</div>
            <h1 className="text-lg font-semibold">Fintech</h1>
          </div>
          <button 
            onClick={handleClear} 
            className="px-3 py-1.5 text-sm rounded-md border border-zinc-700 text-zinc-200 hover:bg-zinc-800"
          >
            Clear Chat
          </button>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto w-[900px] py-4 space-y-4">
          {messages.map((m, i) => (
            <MessageBubble key={i} role={m.role} content={m.content} />
          ))}
          {loading && (
            <div className="flex items-center justify-center py-4">
              <div className="relative h-6 w-6">
                <div className="absolute inset-0 rounded-full border-2 border-zinc-200"></div>
                <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin"></div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-zinc-800 bg-zinc-900">
        <form onSubmit={handleSend} className="mx-auto w-[900px] py-3">
          <textarea
            rows="3"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question here..."
            className="w-full rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-100 placeholder:text-zinc-500 p-3 focus:outline-none focus:ring-1 focus:ring-brand-500"
            disabled={loading}
          />
          <div className="mt-2 flex items-center justify-end">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-brand-500 hover:bg-brand-400 px-3 py-2 text-sm text-white disabled:opacity-60"
            >
              Send
            </button>
          </div>
          <p className="mt-2 text-[11px] text-zinc-500">This is general information, not financial advice.</p>
        </form>
      </footer>
    </div>
  )
}

export default App
