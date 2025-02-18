import React from 'react'
import { motion } from 'motion/react'

function WhileDiv() {
  return (
    <motion.div 
      whileHover={{
        backgroundColor: 'green',
      }}

      whileTap={{
        scale: 0.8
      }}
      
      className='box'
    >

    </motion.div>
  )
}

export default WhileDiv