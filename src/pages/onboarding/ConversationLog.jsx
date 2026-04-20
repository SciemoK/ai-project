import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import CTAButton from '../../components/CTAButton'

const FACE = {
  jack:   import.meta.env.BASE_URL + 'Assets/Jack face.png',
  franco: import.meta.env.BASE_URL + 'Assets/Franco face.png',
  luna:   import.meta.env.BASE_URL + 'Assets/Luna face.png',
  leo:    import.meta.env.BASE_URL + 'Assets/Leo face.png',
}

const BIZ_ICONS    = { restaurant: '🍽️', hotel: '🏨', barbershop: '✂️', mechanic: '🔧', other: '➕' }
const LANG_FLAGS   = { en: '🇬🇧', it: '🇮🇹', fr: '🇫🇷', es: '🇪🇸', other: '🌐' }
const MENU_LABELS  = { hamburger: '☰ Hamburger', topbar: '≡ Top bar', sidebar: '⋮ Sidebar' }
const PAL_LABELS   = { warm: 'Warm', ocean: 'Ocean', forest: 'Forest', earth: 'Earth' }

/* ── Compact answer badge shown for past steps ── */
function AnswerBadge({ step, answers, onEdit }) {
  let content = null

  if (step.type === 'choice') {
    const val = answers[step.field]
    const opt = step.options?.find(o => (typeof o === 'string' ? o : o.id) === val)
    const label = !opt ? String(val)
      : typeof opt === 'string' ? opt
      : `${opt.flag ?? opt.icon ?? ''} ${opt.label}`.trim()
    content = <span>{label}</span>

  } else if (step.type === 'grid') {
    const opt = step.options?.find(o => o.id === answers[step.field])
    content = opt ? <span>{opt.emoji} {opt.label}</span> : null

  } else if (step.type === 'inputs') {
    const parts = step.fields.map(f => answers[f.key]).filter(Boolean)
    content = <span>{parts.join(' · ')}</span>

  } else if (step.type === 'textarea') {
    const v = answers[step.field] || ''
    content = <span>{v.length > 70 ? v.slice(0, 70) + '…' : v}</span>

  } else if (step.type === 'palette') {
    const opt = step.options?.find(o => o.id === answers[step.field])
    if (!opt) return null
    content = (
      <span className="flex items-center gap-2">
        {opt.colors.map((c, i) => (
          <span key={i} style={{ background: c }} className="inline-block w-3.5 h-3.5 rounded-full border border-black/10" />
        ))}
        {opt.label}
      </span>
    )

  } else if (step.type === 'file') {
    const files = answers[step.field] || []
    content = <span>{files.length > 0 ? `${files.length} image(s)` : 'Skipped'}</span>

  } else {
    return null
  }

  if (!content) return null
  const editable = !['bridge', 'summary'].includes(step.type)

  return (
    <div className="flex items-center gap-2 pl-[52px] mt-1">
      <div className="bg-white/70 border border-clover-muted/20 rounded-[10px] px-3 py-1.5 font-grotesk text-[13px] text-clover-dark flex items-center gap-2">
        {content}
        {editable && (
          <button
            onClick={onEdit}
            className="text-clover-muted hover:text-clover-brand transition-colors text-[11px] ml-1"
            aria-label="Edit answer"
          >
            ✏
          </button>
        )}
      </div>
    </div>
  )
}

/* ── Input widget for active / editing step ── */
function InputWidget({ step, answers, onSubmit }) {
  const [localAnswers, setLocalAnswers] = useState(() =>
    step.type === 'inputs'
      ? step.fields.reduce((acc, f) => ({ ...acc, [f.key]: answers[f.key] || '' }), {})
      : {}
  )
  const [localVal, setLocalVal] = useState(answers[step.field] || '')
  const [files, setFiles] = useState(answers[step.field] || [])

  const pl = 'pl-[52px]'

  if (step.type === 'choice') {
    return (
      <div className={`flex flex-wrap gap-2 mt-2 ${pl}`}>
        {step.options.map(opt => {
          const id = typeof opt === 'string' ? opt : opt.id
          const label = typeof opt === 'string' ? opt : `${opt.flag ?? opt.icon ?? ''} ${opt.label}`.trim()
          return (
            <button
              key={id}
              onClick={() => onSubmit(id)}
              className="px-4 py-1.5 rounded-full font-spinnaker text-[13px] border border-clover-muted/40 bg-clover-bg text-clover-text hover:border-clover-brand hover:bg-clover-blob/40 transition-colors"
            >
              {label}
            </button>
          )
        })}
      </div>
    )
  }

  if (step.type === 'grid') {
    return (
      <div className={`flex flex-wrap gap-3 mt-2 ${pl}`}>
        {step.options.map(opt => (
          <button
            key={opt.id}
            onClick={() => onSubmit(opt.id)}
            className="w-[90px] h-[80px] border-2 border-clover-muted/30 rounded-[12px] bg-clover-nav flex flex-col items-center justify-center gap-1 font-grotesk font-bold text-[12px] text-clover-navtext hover:border-clover-brand hover:bg-clover-blob/40 transition-colors"
          >
            <span className="text-[24px]">{opt.emoji}</span>
            {opt.label}
          </button>
        ))}
      </div>
    )
  }

  if (step.type === 'inputs') {
    const canSubmit = step.fields.every(f => !f.required || localAnswers[f.key]?.trim())
    return (
      <div className={`flex flex-col gap-2 mt-2 ${pl} max-w-[400px]`}>
        {step.fields.map(f => (
          <input
            key={f.key}
            type={f.type || 'text'}
            value={localAnswers[f.key]}
            onChange={e => setLocalAnswers(p => ({ ...p, [f.key]: e.target.value }))}
            placeholder={f.placeholder}
            className="bg-clover-bg border border-clover-muted/40 rounded-[8px] px-4 py-2.5 font-spinnaker text-[13px] text-clover-text focus:outline-none focus:border-clover-brand"
          />
        ))}
        <CTAButton size="small" onClick={() => onSubmit(localAnswers)} disabled={!canSubmit}>
          CONTINUE →
        </CTAButton>
      </div>
    )
  }

  if (step.type === 'textarea') {
    return (
      <div className={`flex flex-col gap-2 mt-2 ${pl} max-w-[400px]`}>
        <textarea
          value={localVal}
          onChange={e => setLocalVal(e.target.value)}
          placeholder={step.placeholder}
          rows={3}
          className="bg-clover-bg border border-clover-muted/40 rounded-[8px] px-4 py-2.5 font-spinnaker text-[13px] text-clover-text focus:outline-none focus:border-clover-brand resize-none"
        />
        <CTAButton size="small" onClick={() => onSubmit(localVal)} disabled={!localVal.trim()}>
          CONTINUE →
        </CTAButton>
      </div>
    )
  }

  if (step.type === 'palette') {
    return (
      <div className={`flex gap-3 mt-2 ${pl} flex-wrap`}>
        {step.options.map(p => (
          <button
            key={p.id}
            onClick={() => onSubmit(p.id)}
            className="flex flex-col items-center gap-1 p-2 rounded-[8px] border-2 border-transparent hover:border-clover-muted/40 transition-colors"
          >
            <div className="flex gap-1">
              {p.colors.map((c, i) => (
                <div key={i} style={{ background: c }} className="w-5 h-5 rounded-full border border-black/10" />
              ))}
            </div>
            <span className="font-spinnaker text-[11px] text-clover-muted">{p.label}</span>
          </button>
        ))}
      </div>
    )
  }

  if (step.type === 'file') {
    return (
      <div className={`flex flex-col gap-2 mt-2 ${pl} max-w-[380px]`}>
        <label className="flex items-center justify-center border-2 border-dashed border-clover-muted/40 rounded-[12px] p-4 cursor-pointer hover:border-clover-brand transition-colors">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={e => setFiles(Array.from(e.target.files))}
            className="hidden"
          />
          <span className="font-spinnaker text-clover-muted text-[13px]">
            {files.length > 0 ? `${files.length} image(s) selected` : '📁 Click to upload'}
          </span>
        </label>
        <CTAButton size="small" onClick={() => onSubmit(files)}>
          {files.length > 0 ? 'ADD IMAGES →' : 'SKIP →'}
        </CTAButton>
      </div>
    )
  }

  if (step.type === 'bridge') {
    const name = step.nextChar.charAt(0).toUpperCase() + step.nextChar.slice(1)
    return (
      <div className={`mt-2 ${pl}`}>
        <CTAButton size="small" onClick={() => onSubmit(true)}>
          Meet {name} →
        </CTAButton>
      </div>
    )
  }

  if (step.type === 'summary') {
    return (
      <div className={`mt-3 ${pl} flex flex-col gap-4 max-w-[460px]`}>
        <div className="bg-clover-nav rounded-[14px] border border-clover-muted/20 px-6 py-5 font-spinnaker text-[14px] text-clover-text space-y-2">
          <div>
            {BIZ_ICONS[answers.businessType]}{' '}
            <strong>{answers.businessName}</strong>
            {answers.existingUrl && (
              <span className="text-clover-muted ml-2 text-[12px]">{answers.existingUrl}</span>
            )}
          </div>
          <div>
            {LANG_FLAGS[answers.language]} {answers.language}
            {answers.services && ` · ${answers.services.slice(0, 50)}${answers.services.length > 50 ? '…' : ''}`}
          </div>
          <div>
            {MENU_LABELS[answers.menuBehavior]}
            {answers.colorPalette && ` · ${PAL_LABELS[answers.colorPalette]}`}
          </div>
          {answers.referenceImages?.length > 0 && (
            <div>📁 {answers.referenceImages.length} reference image(s)</div>
          )}
        </div>
        <CTAButton size="large" onClick={() => onSubmit(true)}>
          BUILD MY SITE 🚀
        </CTAButton>
      </div>
    )
  }

  return null
}

/* ── Main conversation log ── */
export default function ConversationLog({
  steps, currentStepIndex, answers, editingStep,
  onAnswer, onEdit, onEditSubmit,
}) {
  const bottomRef = useRef(null)

  useEffect(() => {
    if (bottomRef.current?.scrollIntoView) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentStepIndex])

  function stepHasAnswer(step) {
    if (step.type === 'inputs') return step.fields.some(f => answers[f.key] !== undefined && answers[f.key] !== '')
    if (step.field) return answers[step.field] !== undefined
    return false
  }

  return (
    <div className="flex-1 overflow-y-auto px-10 py-10 flex flex-col gap-6">
      {steps.slice(0, currentStepIndex + 1).map((step, index) => {
        const isActive  = index === currentStepIndex
        const isEditing = index === editingStep
        const answered  = stepHasAnswer(step)
        const showInput = isActive || isEditing

        return (
          <motion.div
            key={step.id}
            className="flex flex-col"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Character bubble */}
            <div className="flex items-start gap-3">
              <img
                src={FACE[step.char]}
                alt={step.char}
                className="w-[40px] h-[40px] object-contain flex-shrink-0 mt-0.5"
              />
              <div className="bg-clover-blob rounded-[16px] px-5 py-3 max-w-[520px]">
                <p
                  className="font-nerko text-clover-text text-[22px] leading-[115%]"
                  style={{ letterSpacing: '-0.3px' }}
                >
                  {step.text}
                </p>
              </div>
            </div>

            {/* Answer badge (past answered step) */}
            {answered && !showInput && (
              <AnswerBadge
                step={step}
                answers={answers}
                onEdit={() => onEdit(index)}
              />
            )}

            {/* Input widget (active or editing) */}
            {showInput && (
              <InputWidget
                key={step.id + (isEditing ? '-edit' : '-active')}
                step={step}
                answers={answers}
                onSubmit={isEditing
                  ? (v) => onEditSubmit(index, v)
                  : onAnswer
                }
              />
            )}
          </motion.div>
        )
      })}
      <div ref={bottomRef} />
    </div>
  )
}
