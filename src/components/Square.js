import React from 'react'

const Square = ({value,onClick}) => {
  return (
    <button className='w-16 h-16 border text-2xl font-bold flex items-center justify-center' onClick={onClick}>{value}</button>
  )
}

export default Square
