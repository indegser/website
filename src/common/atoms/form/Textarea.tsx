import { forwardRef } from 'react'

const Textarea = forwardRef<HTMLTextAreaElement>((props, ref) => {
  const handleInput = e => {
    const offset = 24

    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + offset + 'px'
  }
  return (
    <textarea
      ref={ref}
      {...props}
      onChange={handleInput}
      onInput={handleInput}
    />
  )
})

export default Textarea
