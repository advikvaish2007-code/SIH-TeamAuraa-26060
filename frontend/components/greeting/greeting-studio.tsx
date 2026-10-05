'use client'

import { toPng } from 'html-to-image'
import { useRef, useState } from 'react'
import { OCCASIONS, type OccasionId } from '@/lib/occasions'
import { CardEditor } from './card-editor'
import { GreetingCard } from './greeting-card'

export function GreetingStudio() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [occasionId, setOccasionId] = useState<OccasionId>('national')
  const [name, setName] = useState('')
  const [showEnglish, setShowEnglish] = useState(true)
  const [isDownloading, setIsDownloading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const occasion = OCCASIONS.find((o) => o.id === occasionId) ?? OCCASIONS[0]

  async function handleDownload() {
    if (!cardRef.current) return
    setIsDownloading(true)
    setError(null)
    try {
      const width = cardRef.current.offsetWidth
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 1080 / width,
        cacheBust: true,
      })
      const link = document.createElement('a')
      link.download = `greeting-${occasion.id}.png`
      link.href = dataUrl
      link.click()
    } catch {
      setError('Could not generate the image. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-6xl items-center gap-10 md:grid-cols-[minmax(0,420px)_minmax(0,1fr)] md:gap-16">
      <div className="mx-auto w-full max-w-[420px]">
        <GreetingCard ref={cardRef} occasion={occasion} name={name} showEnglish={showEnglish} />
      </div>
      <div className="flex flex-col gap-3">
        <CardEditor
          occasionId={occasionId}
          onOccasionChange={setOccasionId}
          name={name}
          onNameChange={setName}
          showEnglish={showEnglish}
          onShowEnglishChange={setShowEnglish}
          onDownload={handleDownload}
          isDownloading={isDownloading}
        />
        <p role="status" aria-live="polite" className="min-h-5 text-sm text-red-300">
          {error}
        </p>
      </div>
    </div>
  )
}
