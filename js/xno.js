// script.js
document.addEventListener('DOMContentLoaded', () => {
  const cells = document.querySelectorAll('[data-cell]');
  const message = document.querySelector('[data-message]');
  const restartBtn = document.querySelector('[data-restart]');

  let currentPlayer = 'X';
  let isGameOver = false;

  // Returns the available moves on the board
  function getAvailableMoves(board) {
    return board.reduce((moves, cell, index) => {
      if (!cell) moves.push(index);
      return moves;
    }, []);
  }

  // Checks if the game has ended and returns the winner ('X', 'O', or null if it's a draw)
  function checkWinner(board) {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return board.includes(null) ? null : 'draw';
  }

  // Minimax algorithm implementation
  function minimax(board, depth, maximizingPlayer) {
    const winner = checkWinner(board);
    if (winner !== null) {
      if (winner === 'X') return -10 + depth;
      if (winner === 'O') return 10 - depth;
      return 0;
    }

    const moves = getAvailableMoves(board);
    if (maximizingPlayer) {
      let maxEval = -Infinity;
      for (const move of moves) {
        const newBoard = [...board];
        newBoard[move] = 'O';
        const eval = minimax(newBoard, depth + 1, false);
        maxEval = Math.max(maxEval, eval);
      }
      return maxEval;
    } else {
      let minEval = Infinity;
      for (const move of moves) {
        const newBoard = [...board];
        newBoard[move] = 'X';
        const eval = minimax(newBoard, depth + 1, true);
        minEval = Math.min(minEval, eval);
      }
      return minEval;
    }
  }

  // Function to get the best move for the bot using the Minimax algorithm
  function getBestMove(board) {
    let bestMove;
    let bestEval = -Infinity;
    const moves = getAvailableMoves(board);

    for (const move of moves) {
      const newBoard = [...board];
      newBoard[move] = 'O';
      const eval = minimax(newBoard, 0, false);
      if (eval > bestEval) {
        bestEval = eval;
        bestMove = move;
      }
    }

    return bestMove;
  }

  function handleClick(e) {
    const cell = e.target;
    if (!cell.textContent && !isGameOver) {
      cell.textContent = currentPlayer;
      const board = [...cells].map(cell => cell.textContent || null);
      const winner = checkWinner(board);

      if (winner !== null) {
        if (winner === 'draw') {
          message.textContent = "It's a draw!";
        } else {
          message.textContent = `${winner} wins!`;
        }
        isGameOver = true;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === 'O' && !isGameOver) {
          const bestMove = getBestMove(board);
          cells[bestMove].textContent = currentPlayer;
          currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
          const updatedBoard = [...cells].map(cell => cell.textContent || null);
          const botWinner = checkWinner(updatedBoard);
          if (botWinner !== null) {
            if (botWinner === 'draw') {
              message.textContent = "It's a draw!";
            } else {
              message.textContent = `${botWinner} wins!`;
            }
            isGameOver = true;
          }
        }
      }
    }
  }

  function handleRestart() {
    cells.forEach(cell => cell.textContent = '');
    message.textContent = '';
    isGameOver = false;
    currentPlayer = 'X';
  }

  cells.forEach(cell => cell.addEventListener('click', handleClick));
  restartBtn.addEventListener('click', handleRestart);
});
