import { AnimatePresence, motion } from 'framer-motion'

const CHARS = {
  jack:   { face: import.meta.env.BASE_URL + 'Assets/Jack face.png',   name: 'Jack'   },
  franco: { face: import.meta.env.BASE_URL + 'Assets/Franco face.png', name: 'Franco' },
  luna:   { face: import.meta.env.BASE_URL + 'Assets/Luna face.png',   name: 'Luna'   },
  leo:    { face: import.meta.env.BASE_URL + 'Assets/Leo face.png',    name: 'Leo'    },
}

const ORDER = ['jack', 'franco', 'luna', 'leo']

export default function CharacterStage({ activeChar, introducedChars }) {
  return (
    <div className="w-[260px] flex-shrink-0 flex flex-col items-center justify-between py-12 border-r border-clover-muted/10">

      {/* Active character — large, animates when char changes */}
      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeChar}
            src={CHARS[activeChar].face}
            alt={CHARS[activeChar].name}
            className="w-[160px] h-[160px] object-contain"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>
      </div>

      {/* 4-slot row — final positions, build up as chars introduced */}
      <div className="flex items-end gap-5">
        {ORDER.map(id => {
          const introduced = introducedChars.includes(id)
          const active = id === activeChar
          return (
            <motion.div
              key={id}
              className="flex flex-col items-center gap-1.5"
              animate={{ opacity: introduced ? 1 : 0.18, scale: active ? 1.15 : 1 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={CHARS[id].face}
                alt={id}
                className="w-[46px] h-[46px] object-contain"
                style={{ filter: introduced ? 'none' : 'grayscale(1)' }}
              />
              {/* Active indicator dot */}
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-clover-brand"
                animate={{ opacity: active ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          )
        })}
      </div>

    </div>
  )
}
