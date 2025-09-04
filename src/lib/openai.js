// NOTE: Deprecated: This helper is no longer used. Logic is now inlined in src/App.jsx. Safe to delete.
export async function fetchChatCompletion(params) {
  const apiKey = params.apiKey
  const messages = params.messages
  const model = params.model || 'gpt-4o-mini'
  const temperature = params.temperature || 0.2

  if (!apiKey) {
    throw new Error('Missing API key. Open Settings and add your key.')
  }

  const body = {
    model: model,
    messages: messages,
    temperature: temperature
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + apiKey
    },
    body: JSON.stringify(body)
  })

  if (!response.ok) {
    const txt = await response.text()
    throw new Error('OpenAI error (' + response.status + '): ' + txt)
  }

  const data = await response.json()
  const choices = data && data.choices ? data.choices : []
  const first = choices[0] && choices[0].message ? choices[0].message.content : ''
  return first ? first.trim() : 'No response.'
}
