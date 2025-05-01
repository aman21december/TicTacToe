import React, {useState } from 'react'
import Board from './Board';

const Game = () => {
    const [formValues, setFormValues] = useState({ N: '', M: '' });
    const [formError, setFormError] = useState('');
    const [N, setN] = useState(null);
    const [M, setM] = useState(null);
    const [board, setBoard] = useState([]);

    const [isXNext,setIsXNext]=useState(true)
    const [winner,setWinner]=useState(null)  
    const handleResetBoardSize = () => {
        setN(null)
        setM(null)
    }
    const handleFormChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
        setFormError(''); // Clear error while typing
      };
    
      const handleFormSubmit = (e) => {
        e.preventDefault();
        const boardSize = parseInt(formValues.N);
        const winLength = parseInt(formValues.M);
    
        // ✅ Validation logic
        if (isNaN(boardSize) || isNaN(winLength)) {
          return setFormError('Please enter valid numbers for N and M.');
        }
        if (boardSize < 3) {
          return setFormError('Board size (N) must be at least 3.');
        }
        if (winLength < 3) {
          return setFormError('Win length (M) must be at least 3.');
        }
        if (winLength > boardSize) {
          return setFormError('Win length (M) cannot be greater than board size (N).');
        }
    
        // ✅ Set values and initialize game
        setN(boardSize);
        setM(winLength);
        setBoard(Array.from({ length: boardSize }, () => Array(boardSize).fill(null)));
        setIsXNext(true);
      };
    

    const handleClick=(row,col)=>{
        if(board[row][col] || winner)
            return
    
        const newBoard = board.map((r)=>r.slice())
        newBoard[row][col]=isXNext?'X':'O'
        setBoard(newBoard)
        if(checkWinner(newBoard,row,col)){
            setWinner(isXNext?'X':'O')
        }
        else if(newBoard.flat().every(Boolean)){
            setWinner("Draw")
        }
        setIsXNext(!isXNext)
    }
    const checkWinner = (board,row,col) =>{
        const player = board[row][col];
        const directions = [[0,1],[1,0],[1,1],[1,-1]]
        for(let [dx,dy] of directions){
            let count=1;
            let x=row+dx;
            let y=col+dy;
            while(x>=0 && y>=0 && x<N && y<N && board[x][y]===player){
                count++;
                x+=dx;
                y+=dy;
            }
            x=row-dx;
            y=col-dy;
            while(x>=0 && y>=0 && x<N && y<N && board[x][y]===player){
                count++;
                x-=dx;
                y-=dy;
            }
            if(count>=M){
                return true
            }
        }
        return false;
    }
    const handleReset=()=>{
        setBoard(Array.from({length:N},()=>Array(N).fill(null)))
        setIsXNext(true)
        setWinner(null)
    }

    if (N === null || M === null) {
        return (
          <div className="p-4 flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold mb-2">Welcome to TicTacToe game</h1>
            <h2 className="text-xl font-bold mb-2">Set Board Size and Win Length</h2>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="mr-2">Board size (N):</label>
                <input
                  type="number"
                  name="N"
                  value={formValues.N}
                  onChange={handleFormChange}
                  min="3"
                  className="border px-2 py-1 w-full"
                />
              </div>
              <div>
                <label className="mr-2">Win length (M):</label>
                <input
                  type="number"
                  name="M"
                  value={formValues.M}
                  onChange={handleFormChange}
                  min="3"
                  max={formValues.N || 10}
                  className="border px-2 py-1 w-full"
                />
              </div>
              {formError && <p className="text-red-500">{formError}</p>}
              <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
                Start Game
              </button>
            </form>
          </div>
        );
      }

  return (
    <div className='flex flex-col items-center gap-10'>
        <h1 className="text-3xl font-bold mb-2">Welcome to TicTacToe game</h1>
        <h1 className='text-2xl font-bold'>{winner?winner==="Draw"?"It's a draw":`winner:${winner}`:`Turn: ${isXNext?'X':'O'}`}</h1>
        <Board board={board} onClick={handleClick}/>
        <div className='flex gap-4'>
        <button className='mt-4 px-4 py-2 bg-blue-500  text-white rounded' onClick={handleReset}>Reset</button>
        <button className='mt-4 px-4 py-2 bg-blue-500  text-white rounded' onClick={handleResetBoardSize}>Reset Board Size</button>
        </div>
    </div>
  )
}

export default Game
