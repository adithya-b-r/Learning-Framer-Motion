import React from 'react'
import { motion } from 'motion/react'


function AnimateDiv() {
  return (
    <motion.div 
    initial={{
      x:0,
      y:0,
    }}

    animate={{
      // x:800,
      // y:200,

      // Keyframe Animation
      x: [0, 800, 800, 0, 0],
      y:[0, 0, 400, 400, 0],

      rotate: [0, 360, 0, -360, 0],
      // scale:[1, .7, .4, .1, .4, .7, 1],
    }}

    exit={{
      backgroundColor: 'green',
    }}

    transition={{
      duration: 3,
      delay:1,
      repeat: Infinity,
      ease:'anticipate'
    }}
    
    className='box'>

    </motion.div>
  )
}

export default AnimateDiv