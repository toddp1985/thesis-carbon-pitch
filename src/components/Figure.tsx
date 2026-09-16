import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  caption: string
  className?: string
}

export function Figure({ children, caption, className }: Props) {
  return (
    <figure className={`flex h-full min-h-0 flex-col justify-center ${className ?? ''}`}>
      <div className="min-h-0 flex-1">{children}</div>
      <figcaption className="mt-3 max-w-lg font-mono text-[11px] leading-relaxed tracking-[0.04em] text-mute">
        {caption}
      </figcaption>
    </figure>
  )
}
