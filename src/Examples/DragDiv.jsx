import React from 'react'
import { motion } from 'motion/react'

export default function DragDiv() {
  return (
    <motion.div 
      drag

      whileDrag={{
        scale: 0.8,
        cursor: 'grab'
      }}

      dragConstraints={{
        left: 0,
        top: 0,
        right: window.innerWidth,
        bottom: window.innerHeight
      }}
      
      // To move only in one direction.
      dragDirectionLock={true} 

      className='box'
    >

    </motion.div>
  )
}
