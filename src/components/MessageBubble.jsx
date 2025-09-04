import React from 'react'

function MessageBubble(props) {
  const isUser = props.role === 'user'

  const containerClass = isUser
    ? 'flex items-start gap-3 flex-row-reverse text-right'
    : 'flex items-start gap-3'

  const bubbleClass = isUser
    ? 'max-w-[80%] rounded-2xl px-4 py-3 bg-brand-500 text-white whitespace-pre-wrap break-words'
    : 'max-w-[80%] rounded-2xl px-4 py-3 bg-white border border-zinc-200 whitespace-pre-wrap break-words'

  const avatarClass = isUser
    ? 'h-7 w-7 rounded-full bg-brand-500 text-white'
    : 'h-7 w-7 rounded-full bg-zinc-200'

  return (
    <div className={containerClass}>
      <div className={avatarClass} />
      <div className={bubbleClass}>{props.content}</div>
    </div>
  )
}

export default MessageBubble
