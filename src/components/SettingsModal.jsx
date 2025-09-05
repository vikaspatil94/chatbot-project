import React from 'react'

function SettingsModal({ open, onClose }) {
  if (!open) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-zinc-800 rounded-xl p-6 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Settings</h2>
        
        <div className="space-y-4">
          <div className="text-sm text-zinc-300">
            <p className="mb-2">This application uses the <code className="bg-zinc-700 px-1.5 py-0.5 rounded">gpt-4o-mini</code> model.</p>
            <p>API key is managed through environment variables.</p>
            <p className="mt-2">Update your <code className="bg-zinc-700 px-1.5 py-0.5 rounded">.env</code> file to change the API key.</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
