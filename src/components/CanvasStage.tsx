import { useEffect, useRef } from 'react'
import type { ChapterId } from '../data/chapters'
import { createThesisScene } from '../scene/ThesisScene'

type Props = {
  chapter: ChapterId
  fill?: number
}

export function CanvasStage({ chapter, fill }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const handleRef = useRef<ReturnType<typeof createThesisScene> | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const handle = createThesisScene(canvas)
    handleRef.current = handle
    handle.setChapter(chapter)
    return () => {
      handle.dispose()
      handleRef.current = null
    }
    // Mount once; chapter updates go through the handle.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleRef.current?.setChapter(chapter)
  }, [chapter])

  useEffect(() => {
    if (fill != null) handleRef.current?.setFill(fill)
  }, [fill])

  return (
    <div className="relative h-[38vh] w-full overflow-hidden border-b border-line md:h-full md:border-b-0 md:border-l">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#090b0e_92%)]" />
      {chapter === 'verde' && (
        <div className="pointer-events-none absolute bottom-5 left-5 right-5 md:bottom-8 md:left-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold">
            Stylized terrain · not a real concession
          </p>
          <p className="mt-1 max-w-sm font-serif text-xl text-paper md:text-2xl">
            Verde Corridor Conservation
          </p>
        </div>
      )}
    </div>
  )
}
