import { type DragEvent, type ReactNode, useRef } from 'react';
import Piece from './Piece';
import type { ChessPieceType, SquarePropsType } from '../types';


/* The `Square` component in this TypeScript React code snippet is responsible for rendering a square
on a chessboard. It takes several props as input, including `boardMatrix` (which represents the
current state of the chessboard), `changePosition` (a function to update the position of a chess
piece), `uniqueId` (a unique identifier for the square), `onDragStart` (a function to handle the
start of a drag operation), `squarePosition` (the position of the square on the board), `tileColor`
(the color of the square), `updateBlackKill` and `updateWhiteKill` (functions to update the kill
count for black and white pieces), `setWhiteMoved` (a function to set a flag for white pieces being
moved), and `simulate` (a function to simulate the game). */
const Square = ({
  boardMatrix,
  changePosition,
  uniqueId,
  onDragStart,
  squarePosition,
  tileColor,
  updateBlackKill,
  updateWhiteKill,
  setWhiteMoved,
  simulate,
}: SquarePropsType) => {
  const squareRef = useRef<HTMLDivElement | null>(null);
  
  /**
   * The function `movePiece` filters the `boardMatrix` to find a specific piece by its `id`, updates
   * its position, sets a flag for white pieces being moved, and then simulates the game.
   * @param {string | undefined} id - The `id` parameter is a string that represents the unique
   * identifier of a chess piece.
   */
  const movePiece = async (id: string | undefined) => {
    const currentPiece = boardMatrix.find((piece: { id: string }) => piece.id === id)
    if (currentPiece) {
      changePosition([...(boardMatrix.filter((piece) => piece.id !== id)),
        { id: currentPiece.id, title: currentPiece.title, value: squarePosition }]
      );
    }
    await setWhiteMoved();
    simulate();
  };

  /**
   * The handleDrop function in TypeScript React handles dropping a draggable element, checking for
   * valid moves and updating game state accordingly.
   * @param {DragEvent} e - The parameter `e` in the `handleDrop` function is of type `DragEvent`,
   * which is an event object that is triggered when a dragged element is being dropped onto a drop
   * target. This event object contains information about the drag and drop operation, such as the data
   * being dragged, the target
   */
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();

    const id = e.dataTransfer?.getData('text');
    const elements = document.getElementsByClassName('highlightedMove');
    const killMove = document.getElementsByClassName('killMove');
    const currentSquareRef = squareRef.current?.children;
    const dropIndicator = currentSquareRef && currentSquareRef[0];

    if (dropIndicator?.className === 'highlightedMove'){
        movePiece(id);
    } 
    
    if (dropIndicator && killMove.length > 0) {
      const isKillMove = squareRef.current?.getAttribute('class') === 'killMove';
      if (isKillMove){
        while(killMove.length > 0){
          if (killMove[0].getAttribute('uniqueId') === squareRef.current?.getAttribute('uniqueId')) {
            const piece = killMove[0].children[0].getAttribute('data-piece');
            if (piece && piece.charAt(piece.length - 1) === 'W') {
              updateWhiteKill(piece);
            } else {
              updateBlackKill(piece);
            }     
            killMove[0].removeChild(killMove[0].children[0]);
          }
          killMove[0].removeAttribute('class');
        }
        movePiece(id);
      }
    }

    while(elements.length > 0){
      elements[0].parentNode?.removeChild(elements[0]);
    }
    while(killMove.length > 0){
      killMove[0].removeAttribute('class');
    }
    
    e.dataTransfer?.clearData();
  };

  /**
   * The handleDragOver function prevents the default behavior of a drag event.
   * @param {DragEvent} e - DragEvent
   */
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const renderBoardMatrix = (): ReactNode => {
    return boardMatrix.filter(pos => (JSON.stringify(squarePosition) === JSON.stringify(pos.value)))
      .map(p => {
        return(<Piece
          color={(p.id.includes('w')) ? 'white' : 'black'} 
          uniqueId={p.id} 
          name={p.title} 
          info={p.title + p.id.includes('w') ? 'W' : 'B' }
          key={p.id}
          onDragStart={onDragStart}
          position={p.value}
        />);
        }
      )
  }

  return (
    <div
      id={uniqueId}
      ref={squareRef}
      style={{
        width: '12.5%',
        height: '12.15%',
        display: 'inline-block',
        backgroundColor: tileColor,
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      data-position={squarePosition}
    >
      {renderBoardMatrix()}
    </div>
  );
};

export default Square;
