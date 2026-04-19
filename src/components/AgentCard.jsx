export default function AgentCard({ name, tagline, description, imageSrc, imageAlt }) {
  return (
    <div className="flex flex-col items-center gap-3 text-center max-w-[180px]">
      {/* Blob + portrait */}
      <div className="relative w-[120px] h-[120px] flex items-center justify-center">
        <div className="absolute inset-0 bg-clover-blob rounded-full opacity-80" />
        <img
          src={imageSrc}
          alt={imageAlt}
          className="relative z-10 w-[100px] h-[100px] object-cover object-top rounded-full"
        />
      </div>

      <h3 className="font-nerko text-clover-dark text-[18px] leading-tight">{name}</h3>
      <p className="font-grotesk font-medium text-clover-brand text-[11px] uppercase tracking-wider">
        {tagline}
      </p>
      {description && (
        <p className="font-spinnaker text-clover-muted text-[12px] leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
