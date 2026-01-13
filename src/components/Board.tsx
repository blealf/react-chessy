import { useEffect, useCallback, useRef, useLayoutEffect, useReducer, type DragEvent, type ReactElement } from 'react';
import styled from 'styled-components';
import Square from './Square';
import {
  kingMove,
  queenMove,
  bishopMove,
  knightMove,
  rookMove,
  pawnMove,
} from '../utils/Movements';
import { useDispatch } from 'react-redux';
import { updateKilled } from '../features/GameSlice';
import { simulate } from '../utils/simulate';
import type { MovesReturnType } from '../types';
import { boardReducer, initialPosition, initialState } from '../utils/boardReducer.ts';
import type { NumberArray } from '../types/types';

const BoardWrapper = styled.div`
  margin: 0 auto;
  max-width: 700px;
  height: 700px;
  margin-bottom: -30px;
  border: 1px solid brown;
  transform: rotateY(-10deg) rotateX(20deg);
  -webkit-transform: rotateY(-10deg) rotateX(25deg);
  box-shadow: 10px 10px 50px #1a202c, 0 1px 40px brown;
  transition: transform 1s ease-in-out;
  // background: #1a202c;
`;

const Button = styled.button`
  padding: 10px 20px;
  background: brown;
  color: #fff;
  margin-right: 15px;
  border-radius: 5px;
  border: none;
  font-size: 17px;
  cursor: pointer;
`;

// console.log(kingMove([0,3]))
// console.log(pawnMove([1,3], false, true, ["[1,2]"]))
// console.log(pawnKill([0,1], true))
// console.log(knightMove([2,3]))
// console.log(rookMove([3,3]));
// console.log(bishopMove([3,3]));
// console.log(queenMove([3,3]));
// console.log(testMoves([3,3]));

/**
 * The `Board` component in TypeScript React manages a chess board interface with draggable pieces,
 * highlighting valid moves, and updating game state based on player interactions.
 * @returns The `Board` component is returning a JSX structure that includes three buttons for
 * simulating, resetting, and flipping the board, as well as a `BoardWrapper` component that contains
 * the `checkedPattern` array of `Square` components. The `Board` component also includes event
 * handlers for mouse leave events on the `BoardWrapper` component.
 */
const Board = () => {
  const [{
    occupied,
    position,
    moveColor,
    whiteKilled,
    blackKilled,
    whiteMoved,
    firstUpdate,
  }, dispatch] = useReducer(boardReducer, initialState);
  const checkedPattern: ReactElement[] = [];
  let swap = false;
  
  const storeDispatch = useDispatch();
  const boardRef = useRef<HTMLDivElement>(null);


  /* The above code is a TypeScript React function component that uses the `useCallback` hook to define
  a function named `updateKilledPieces`. This function dispatches an action to update the killed
  pieces in the store with the values of `blackKilled` and `whiteKilled`. The dependencies for the
  `useCallback` hook are `blackKilled`, `whiteKilled`, and `storeDispatch`, meaning the function
  will only be recreated if any of these dependencies change. */
  const updateKilledPieces = useCallback(() => {
    storeDispatch(updateKilled({ blackKilled: blackKilled, whiteKilled: whiteKilled}));
  }, [blackKilled, whiteKilled, storeDispatch]);

  /* The above code snippet is using the `useLayoutEffect` hook in a React component. It checks if it
  is the first update and if the white piece has not moved. If these conditions are met, it
  dispatches an action to set `firstUpdate` to `false`. Then, it sets a timeout to call the
  `flipBoard` function after 100 milliseconds, passing either 'black' or 'white' based on the value
  of `whiteMoved`. The `useLayoutEffect` hook will run this effect whenever `whiteMoved` or
  `firstUpdate` changes. */
  useLayoutEffect(() => {
    if (firstUpdate && whiteMoved === false) {
      dispatch({
        type: 'SET_FIRST_UPDATE',
        payload: false,
      });
      return;
    }
    setTimeout(() => {
      flipBoard(whiteMoved ? 'black' : 'white');
    }, 100);
  }, [whiteMoved, firstUpdate]);

  /**
   * The `useEffect` hook updates the occupied positions and calls the `updateKilledPieces` function
   * when the `position` or `updateKilledPieces` dependencies change, while the `onDragStart` function
   * sets data for drag events and plays a piece.
   * @param {DragEvent} e - The parameter `e` in the `onDragStart` function is of type `DragEvent`,
   * which is an event object that is triggered when a draggable element is being dragged. It contains
   * information about the drag operation, such as the target element being dragged and the data being
   * transferred during the drag-and
   */
  useEffect(() => {
    dispatch({
      type: 'SET_OCCUPIED',
      payload: position.map((p) => JSON.stringify(p.value))
    });
    updateKilledPieces();
  }, [position, updateKilledPieces]);
  
  const onDragStart = (e: DragEvent) => {
    const target = e.target as HTMLImageElement
    e.dataTransfer.setData('text', target.id);
    playPiece(target);
  };
  
  /**
   * This function takes an id and a color as input, and returns the color associated with the id if
   * found in the moveColor array, otherwise it returns the input color.
   * @param {string} id - The `id` parameter in the `setColor` function is a string that represents the
   * identifier of a color.
   * @param {string} color - The `color` parameter in the `setColor` function represents the color that
   * you want to set for a specific element identified by its `id`. This function iterates over an
   * array called `moveColor` to find the color associated with the provided `id`. If the `id` matches,
   * it
   * @returns The `setColor` function is returning the `selectedColor` variable, which is determined
   * based on the `id` parameter passed to the function. If the `id` matches an entry in the
   * `moveColor` array, the corresponding color from the array is selected. If no match is found, the
   * `color` parameter passed to the function is used instead.
   */
  const setColor = (id: string, color: string): string => {
    let selectedColor = '';
    moveColor.forEach((c: { id: string, color: string }) => {
      if (c.id === id) {
        selectedColor = c.color;
      } else { selectedColor = color; }
    });
    return selectedColor;
  };
  
  /**
   * The function `createPattern` generates a Square component with various props and dispatches
   * actions based on user interactions.
   * @param {string} color - The `color` parameter in the `createPattern` function is a string that
   * represents the color used for styling the `Square` component. It is passed as an argument to the
   * `setColor` function to set the tile color of the square being created.
   * @param {NumberArray} currentPos - The `currentPos` parameter in the `createPattern` function is a
   * `NumberArray` type, which is likely an array of numbers representing a position or coordinates. It
   * is used to determine the position of the Square component being created in the pattern.
   */
  const createPattern = (color: string, currentPos: NumberArray) => {
    checkedPattern.push(<Square
      tileColor={setColor(JSON.stringify(currentPos), color)}
      key={JSON.stringify(currentPos)}
      uniqueId={JSON.stringify(currentPos)}
      squarePosition={currentPos}
      boardMatrix={position}
      onDragStart={onDragStart}
      updateBlackKill={(val) => dispatch({ type: 'SET_BLACK_KILLED', payload: [...blackKilled, val]})}
      updateWhiteKill={(val) => dispatch({ type: 'SET_WHITE_KILLED', payload: [...whiteKilled, val]})}
      setWhiteMoved={() => dispatch({ type: 'SET_WHITE_MOVED', payload: !whiteMoved})}
      changePosition={(val) => dispatch({ type: 'SET_POSITION', payload: val})}
      simulate={() => simulate({ position, whiteMoved, occupied })}
      onChangeColor={() => changeColor(JSON.stringify(currentPos))}
    />);
  };
  
  /* This creates a chessboard pattern by alternating
    between white and brown squares. It uses the `createBoard` function with the `useCallback` hook to
    generate the board. The `createPattern` function is called for each square with the color and
    position as parameters. The `swap` variable is used to alternate between colors for each row of
    the board. The function is called immediately after */
  const createBoard = useCallback(() => {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        (swap) ? createPattern('white', [i, j]) : createPattern('brown', [i, j]);
        swap = (j < 7) ? !swap : swap;
      }
    }
  }, [createPattern])
  createBoard()

  /**
   * The function `changeColor` filters through checkedPattern to find a matching square by position
   * and updates the moveColor state with a new color.
   * @param {string} id - The `id` parameter is a string that is used to identify a specific element or
   * object. In this case, it is being used to filter elements in the `checkedPattern` array based on
   * their position.
   */
  const changeColor = (id: string) => {
    checkedPattern.filter((square: ReactElement) =>
      // @ts-expect-error TODO: fix
      id === square.props.position // TODO: verify props.position exists
    ).forEach(() => {
      dispatch({ 
        type: 'SET_MOVE_COLOR', 
        payload: [...moveColor, { id: id, color: 'green' }]
      });
    });
  };

/**
 * The `playPiece` function in TypeScript React determines the valid moves for a chess piece based on
 * its type, color, and position on the board.
 * @param {HTMLImageElement} liftedPiece - The `liftedPiece` parameter in the `playPiece` function is
 * expected to be an HTMLImageElement representing a chess piece that the player wants to move on the
 * board.
 * @returns The function `playPiece` returns nothing (`void`). It performs various operations based on
 * the input `liftedPiece` and updates the `canPlay` array with possible moves for the piece. The
 * function ends by calling `determineDropLocation` with the calculated `canPlay` array.
 */
  const playPiece = (liftedPiece: HTMLImageElement) => {
    let canPlay: MovesReturnType = [];
    const piecePosition: NumberArray = [];
    const piece = liftedPiece?.getAttribute('data-name');
    const pieceColor = liftedPiece?.getAttribute('id')?.charAt(0);
    let moved = false;
    const canMove =
      (whiteMoved === false && pieceColor === 'w') ||
      (whiteMoved === true && pieceColor === 'b');
      
    if (!canMove) return;
    
    liftedPiece?.getAttribute('data-position')
      ?.split(',')
      .forEach((val: string) => {
        piecePosition.push(parseInt(val));
      });

    if (((piecePosition[0] > 1) && pieceColor === 'b') ||
      ((piecePosition[0] < 6) && pieceColor === 'w')) {
      moved = true;
    }

    switch (piece) {
      case 'king':
        canPlay = kingMove(piecePosition);
        break;
      case 'queen':
        canPlay = queenMove(piecePosition, occupied);
        break;
      case 'bishop':
        canPlay = bishopMove(piecePosition, occupied);
        break;
      case 'knight':
        canPlay = knightMove(piecePosition);
        break;
      case 'rook':
        canPlay = rookMove(piecePosition, occupied);
        break;
      case 'pawn':
        canPlay = pawnMove(piecePosition, moved, pieceColor === 'b', occupied)
        break;
      default:
    }

    determineDropLocation(canPlay, liftedPiece);
  };

/**
 * The function `determineDropLocation` highlights valid move locations on a chessboard and marks
 * potential captures with a different style.
 * @param {MovesReturnType} play - The `play` parameter is of type `MovesReturnType`, which is an array
 * of `NumberArray`. Each `NumberArray` represents a move on the game board.
 * @param {HTMLImageElement} liftedPiece - The `liftedPiece` parameter in the `determineDropLocation`
 * function is an HTMLImageElement representing the chess piece that is currently being moved or lifted
 * by the player.
 */
  const determineDropLocation = (play: MovesReturnType, liftedPiece: HTMLImageElement) => {
    console.log({ id: liftedPiece.dataset.position })
    play.forEach((move: any) => {
      // console.log({ move })
      const square = document.getElementById(JSON.stringify(move));
      // console.log(square)
      if (square && square.children.length < 1) {
        const element = document.createElement('div');
        element.setAttribute('class', 'highlightedMove');
        Object.assign(element.style, {
          margin: '0 auto',
          marginTop: '30px',
          height: '20px',
          width: '20px',
          borderRadius: '5px',
          backgroundColor: 'green',
        });
        square.appendChild(element);
      }
      else {
        if (square && square.children.length > 0) {
          if(liftedPiece){
            if(liftedPiece.getAttribute('id')?.charAt(0) !== square.children[0].getAttribute('id')?.charAt(0)){
              square.setAttribute('class', 'killMove');
            }
          }
        }
      }
    });
  };

 /**
  * The flipBoard function rotates a board element and its children based on the specified color or
  * current rotation state.
  * @param {string} [color] - The `flipBoard` function takes an optional `color` parameter, which can
  * be either 'white' or undefined. If the `color` parameter is 'white' or if the current board's
  * transform includes '170', the function will rotate the board and its children elements accordingly.
  * Otherwise, it
  */
  const flipBoard = (color?: string) => {
    const testNoFlip = true
    if (testNoFlip) return
    const currentBoardRef = boardRef?.current
    let refStyle: any = currentBoardRef?.style

    if (color === 'white' || currentBoardRef?.style.transform.includes('170')) {
      refStyle.transform = 'rotateY(-10deg) rotateX(20deg)';

      if (currentBoardRef?.children) {
        Array.from(currentBoardRef?.children).forEach((child) => {
          if (child?.children[0]) {
            const children= child.children[0] as HTMLElement
            children.style.transform = 'rotate(0deg)';
          }
        });
      }
    } else {
      refStyle.transform = 'rotateY(170deg) rotateX(160deg)';

      if (currentBoardRef?.children) {
        Array.from(currentBoardRef?.children).forEach((child) => {
          if (child.children[0]) {
            const children= child.children[0] as HTMLElement
            children.style.transform = 'rotate(180deg)';
          }
        });
      }
    }
  };

  /**
   * The function `handleBoardUpdate` removes highlighted moves and kill moves classes from the board.
   */
  const handleBoardUpdate = () => {
    const elements = document.getElementsByClassName('highlightedMove');
    const killMove = document.getElementsByClassName('killMove');
    try {
      while (elements.length > 0) {
        elements[0]?.parentNode?.removeChild(elements[0]);
      }
      while (killMove.length > 0) {
        killMove[0].removeAttribute('class');
      }
      // eslint-disable-next-line no-empty
    } catch (err) { }
  };


  /**
   * The `resetBoard` function dispatches a 'RESET' action and flips the board to 'white'.
   */
  const resetBoard = () => {
    dispatch({ type: 'RESET' });
    flipBoard('white');
    window.location.reload()
  };

  const canReset = (): boolean => {
    return JSON.stringify(position) !== JSON.stringify(initialPosition)
  }

  return (
    <>
      <div className="board">
        <Button onClick={() => simulate({ position, whiteMoved, occupied })}>Simulate</Button>
        {canReset() ? <Button onClick={resetBoard}>Reset</Button> : null}
        <Button onClick={() => flipBoard()}>Flip</Button>
      </div>
      <BoardWrapper
        ref={boardRef}
        onMouseLeave={handleBoardUpdate}
      >
        {checkedPattern}
      </BoardWrapper>
    </>
  );
};

export default Board;

