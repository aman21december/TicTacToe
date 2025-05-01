import React from 'react'
import Square from './Square'

const Board = ({board,onClick}) => {
  return (
    <div className='grid flex items-center justify-center' style={{gridTemplateColumns:`repeat(${board.length},4rem)`}}>
        {board.map((row,i)=>{
            return row.map((cell,j)=>
                <Square key={`${i}-${j}`} value={cell} onClick={() => onClick(i, j)}/>
     
        )
        })}
    
    </div>
  )
}

export default Board
