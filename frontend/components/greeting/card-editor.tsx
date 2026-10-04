'use client'

import { Download, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OCCASIONS, type OccasionId } from '@/lib/occasions'
import { cn } from '@/lib/utils'

type CardEditorProps = {
  occasionId: OccasionId
  onOccasionChange: (id: OccasionId) => void
  name: string
  onNameChange: (name: string) => void
  showEnglish: boolean
  onShowEnglishChange: (value: boolean) => void
  onDownload: () => void
  isDownloading: boolean
}

export function CardEditor({
  occasionId,
  onOccasionChange,
  name,
  onNameChange,
  showEnglish,
  onShowEnglishChange,
  onDownload,
  isDownloading,
}: CardEditorProps) {
  return (
    <section
      aria-labelledby="editor-title"
      className="flex w-full flex-col gap-8 rounded-3xl border border-gold/15 bg-emerald-deep/60 p-6 backdrop-blur-md md:p-8"
    >
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium uppercase tracking-[0.3em] text-gold">Card Studio</span>
        <h1 id="editor-title" className="text-balance text-3xl font-semibold text-ivory">
          Personalize your greeting
        </h1>
        <p className="text-pretty text-sm leading-relaxed text-ivory/65">
          Pick an occasion, add your name, and download a story-ready card in full resolution.
        </p>
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm font-medium text-ivory/90">Occasion</legend>
        <div className="grid grid-cols-2 gap-2">
          {OCCASIONS.map((occasion) => {
            const selected = occasion.id === occasionId
            return (
              <label
                key={occasion.id}
                className={cn(
                  'flex cursor-pointer flex-col gap-1 rounded-2xl border px-4 py-3 transition-colors focus-within:ring-2 focus-within:ring-gold/60',
                  selected
                    ? 'border-gold bg-gold/15 text-ivory'
                    : 'border-ivory/10 bg-forest/40 text-ivory/70 hover:border-ivory/25 hover:text-ivory',
                )}
              >
                <input
                  type="radio"
                  name="occasion"
                  value={occasion.id}
                  checked={selected}
                  onChange={() => onOccasionChange(occasion.id)}
                  className="sr-only"
                />
                <span className="text-sm font-medium">{occasion.label}</span>
                <span lang="ar" dir="rtl" className="font-arabic text-base text-gold/90">
                  {occasion.titleAr}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="sender-name" className="text-sm font-medium text-ivory/90">
          Your name
        </label>
        <input
          id="sender-name"
          type="text"
          value={name}
          maxLength={32}
          autoComplete="name"
          placeholder="e.g. محمد العتيبي"
          onChange={(e) => onNameChange(e.target.value)}
          dir="auto"
          className="h-12 rounded-xl border [font-family:var(--font-inter),var(--font-amiri),sans-serif] border-ivory/15 bg-forest/60 px-4 text-ivory placeholder:text-ivory/35 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40"
        />
        <span className="text-xs text-ivory/45">{name.length}/32 characters</span>
      </div>

      <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-ivory/10 bg-forest/40 px-4 py-3">
        <span className="flex flex-col">
          <span className="text-sm font-medium text-ivory/90">English subtitle</span>
          <span className="text-xs text-ivory/50">Show the translated title under Arabic</span>
        </span>
        <input
          type="checkbox"
          role="switch"
          checked={showEnglish}
          onChange={(e) => onShowEnglishChange(e.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden="true"
          className="relative h-6 w-11 shrink-0 rounded-full bg-ivory/20 transition-colors after:absolute after:left-0.5 after:top-0.5 after:size-5 after:rounded-full after:bg-ivory after:transition-transform peer-checked:bg-gold peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-gold/60"
        />
      </label>

      <Button
        onClick={onDownload}
        disabled={isDownloading}
        size="lg"
        className="h-12 rounded-xl bg-gold text-base font-semibold text-forest hover:bg-gold/90"
      >
        {isDownloading ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Download aria-hidden="true" />}
        {isDownloading ? 'Preparing…' : 'Download card'}
      </Button>
    </section>
  )
}
