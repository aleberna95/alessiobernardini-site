'use client'

import { motion } from 'motion/react'

export default function MotionMain({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white"
    >
      {children}
    </motion.main>
  )
}
