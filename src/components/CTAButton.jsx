export default function CTAButton({ children, size = 'small', onClick, className = '', disabled = false }) {
  const baseStyles =
    'bg-clover-brand text-[#FAF7F1] rounded-[8.84px] flex items-center justify-center transition-opacity hover:opacity-90'
  const shadow = { boxShadow: '3px 4px 0px rgba(0,0,0,0.42)' }

  const variants = {
    small: 'font-grotesk font-bold text-[13px] px-[26px] py-[13px] gap-2',
    large: 'font-anybody font-bold text-[30px] px-[40px] py-[20px] gap-[14px]',
  }

  const disabledStyles = disabled ? 'opacity-40 cursor-not-allowed pointer-events-none' : ''

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[size]} ${disabledStyles} ${className}`}
      style={shadow}
    >
      {children}
    </button>
  )
}
