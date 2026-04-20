import React from 'react'

// Minimal framer-motion stub for test environments.
// Renders children immediately without animation delays so that
// AnimatePresence + motion.div work synchronously in jsdom.

const motion = new Proxy(
  {},
  {
    get: (_, tag) =>
      // eslint-disable-next-line react/display-name
      React.forwardRef(({ children, ...rest }, ref) => {
        // Strip framer-specific props before forwarding to DOM element
        const {
          initial, animate, exit, variants, transition,
          whileHover, whileTap, whileFocus, whileDrag, whileInView,
          layout, layoutId,
          onAnimationStart, onAnimationComplete, onUpdate,
          ...domProps
        } = rest
        return React.createElement(tag, { ...domProps, ref }, children)
      }),
  }
)

function AnimatePresence({ children }) {
  return <>{children}</>
}

export { motion, AnimatePresence }
