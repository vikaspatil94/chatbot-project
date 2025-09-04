import React, { useEffect, useState } from 'react'

const STORAGE_KEY = 'OPENAI_API_KEY'
const STORAGE_MODEL = 'OPENAI_MODEL'

function SettingsModal(props) {
  const { open, onClose, defaultModel = 'gpt-4o-mini', onModelChange } = props

  const [key, setKey] = useState('')
  const [model, setModel] = useState(defaultModel)

  useEffect(() => {
    if (open) {
      const savedKey = localStorage.getItem(STORAGE_KEY) || ''
      const savedModel = localStorage.getItem(STORAGE_MODEL) || defaultModel
      setKey(savedKey)
      setModel(savedModel)
    }
  }, [open, defaultModel])

  if (!open) {
    return null
  }

  function handleSave() {
    localStorage.setItem(STORAGE_KEY, key)
    localStorage.setItem(STORAGE_MODEL, model)
    if (onModelChange) {
      onModelChange(model)
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center" onClick={onClose}>
      <div className="w-[560px] rounded-xl bg-white p-5 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-base font-semibold mb-3">Settings</h2>

        <label className="block text-sm font-medium text-zinc-700 mb-1">OpenAI API Key</label>
        <input
          type="password"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="sk-..."
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 mb-3"
        />
        <p className="text-xs text-zinc-500 mb-4">Stored locally in your browser (localStorage).</p>

        <label className="block text-sm font-medium text-zinc-700 mb-1">Model</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 mb-4"
        >
          <option value="gpt-4o-mini">gpt-4o-mini</option>
          <option value="gpt-4o">gpt-4o</option>
          <option value="gpt-3.5-turbo">gpt-3.5-turbo</option>
        </select>

        <div className="flex items-center justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1.5 text-sm rounded-md border border-zinc-300">Cancel</button>
          <button onClick={handleSave} className="px-3 py-1.5 text-sm rounded-md bg-zinc-900 text-white">Save</button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
