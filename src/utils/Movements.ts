import type {MovesType, MovesReturnType } from '../types';
import type { NumberArray, StringArray } from '../types/types';

const moveUp = (value: NumberArray, occupied: StringArray) => {
  let y = value[0]
  const x = value[1], newPoints = []
  
  while(y > 0) {
    if(occupied?.indexOf(JSON.stringify([y-1,x])) >= 0) { 
      newPoints.push([ x, y-1])
      break;
    }
    newPoints.push([ x, y-1])
    y--;
  }
  return newPoints;
}

const moveDown = (value: NumberArray, occupied: StringArray) => {
  let y = value[0]
  const x = value[1], newPoints = []

  while(y < 7) {
    if(occupied.includes(JSON.stringify([y+1,x]))) { 
      newPoints.push([ x, y+1]);
      break;
    }
    newPoints.push([ x, y+1]);
    y++;
  }

  return newPoints;
}

const moveRight = (value: NumberArray, occupied: StringArray) => {
  let x = value[1]
  const y = value[0], newPoints = []
  
  while(x < 7) {
    if(occupied.indexOf(JSON.stringify([y,x+1])) >= 0) { 
      newPoints.push([ x+1, y])
      break;
    }
    newPoints.push([ x+1, y])
    x++;
  }
  return newPoints;
}


const moveLeft = (value: NumberArray, occupied: StringArray) => {
  let x = value[1]
  const y = value[0], newPoints = []
  
  while(x > 0) {
    if(occupied.indexOf(JSON.stringify([y,x-1])) >= 0) { 
      newPoints.push([ x-1, y])
      break;
    }
    newPoints.push([ x-1, y])
    x--;
  }
  return newPoints;
}
console.log(moveDown([6, 4], ['[6,4]','[7,4]']))

const moveLeftUp = (value: NumberArray, occupied?: StringArray) => {
  let x = value[1], y = value[0]
  const newPoints = []
  
  while((x > 0) && (y > 0)) {
    if (occupied && occupied.indexOf(JSON.stringify([y - 1, x - 1])) >= 0) {
      newPoints.push([ x-1, y-1]);
      break;
    }
    newPoints.push([ x-1, y-1]);
    x--; y--;
  }
  return newPoints;
}

const moveRightUp = (value: NumberArray, occupied?: StringArray): MovesReturnType => {
  let x = value[1], y = value[0]
  const newPoints = []
  
  while((x < 7) && (y > 0)) {
    if (occupied && occupied.indexOf(JSON.stringify([y - 1, x + 1])) >= 0) {
      newPoints.push([ x+1, y-1]);
      break;
    }
    newPoints.push([ x+1, y-1]);
    x++; y--;
  }
  return newPoints;
}

const moveRightDown = (value: NumberArray, occupied?: StringArray): MovesReturnType => {
  let  x = value[1], y = value[0]
  const newPoints = []
  
  while((x < 7) && (y < 7)) {
    if (occupied && occupied.indexOf(JSON.stringify([y + 1, x + 1])) >= 0) {
      newPoints.push([ x+1, y+1]);
      break;
    }
    newPoints.push([ x+1, y+1]);
    x++; y++;
  }
  return newPoints;
}

const moveLeftDown = (value: NumberArray, occupied?: StringArray): MovesReturnType => {
  let x = value[1], y = value[0]
  const newPoints = []
  
  while((x > 0) && (y < 7)) {
    if (occupied && occupied.indexOf(JSON.stringify([y + 1, x - 1])) >= 0) {
      newPoints.push([ x-1, y+1]);
      break;
    }
    newPoints.push([ x-1, y+1]);
    x--; y++;
  }
  return newPoints;
}

const reversePositions = (positionsArray: MovesReturnType): MovesReturnType => {
  
  return positionsArray
    .filter((pos) => !pos.includes(null))
    .map(pos => pos.reverse())
}

const kingMove = (currentPosition: NumberArray) => {
  const x = currentPosition[1], y = currentPosition[0]

  const newPositions = [
    [x, ((y+1 <= 7) ? y+1 : null)],
    [x, ((y-1 >= 0) ? y-1 : null)],
    [((x+1 <= 7) ? x+1 : null), y],
    [((x-1 >= 0) ? x-1 : null), y],
    [((x+1 <= 7) ? x+1 : null), ((y-1 >= 0) ? y-1 : null)],
    [((x+1 <= 7) ? x+1 : null), ((y+1 <= 7) ? y+1 : null)],
    [((x-1 >= 0) ? x-1 : null), ((y-1 >= 0) ? y-1 : null)],
    [((x-1 >= 0) ? x-1 : null), ((y+1 <= 7) ? y+1 : null)],
  ];
  
  return reversePositions(newPositions);
}

const queenMove = (currentPosition: NumberArray, occupied: StringArray) => {
  return [
    ...bishopMove(currentPosition, occupied),
    ...rookMove(currentPosition, occupied)
  ]
}

const bishopMove = (currentPosition: NumberArray, occupied: StringArray) => {
  return reversePositions([
    ...moveLeftUp(currentPosition, occupied),
    ...moveRightUp(currentPosition, occupied),
    ...moveLeftDown(currentPosition, occupied),
    ...moveRightDown(currentPosition, occupied)
  ])
}

const knightMove = (currentPosition: NumberArray) => {
  const x = currentPosition[1], y = currentPosition[0]
  const newPositions = [
    [((x-2 >= 0) ? x-2 : null), ((y-1 >= 0) ? y-1 : null)],
    [((x-2 >= 0) ? x-2 : null), ((y+1 <= 7) ? y+1 : null)],
    [((x-1 >= 0) ? x-1 : null), ((y-2 >= 0) ? y-2 : null)],
    [((x+1 <= 7) ? x+1 : null), ((y-2 >= 0) ? y-2 : null)],
    [((x+2 <= 7) ? x+2 : null), ((y-1 >= 0) ? y-1 : null)],
    [((x+2 <= 7) ? x+2 : null), ((y+1 <= 7) ? y+1 : null)],
    [((x-1 >= 0) ? x-1 : null), ((y+2 <= 7) ? y+2 : null)],
    [((x+1 <= 7) ? x+1 : null), ((y+2 <= 7) ? y+2 : null)],
  ];
  
  return reversePositions(newPositions);  
}

const rookMove = (currentPosition: NumberArray, occupied: StringArray) => {
  return reversePositions([
    ...moveUp(currentPosition, occupied),
    ...moveDown(currentPosition, occupied),
    ...moveRight(currentPosition, occupied),
    ...moveLeft(currentPosition, occupied)
  ]);
}

const pawnMove = (
  currentPosition: NumberArray,
  moved: boolean,
  fromTop: boolean,
  occupied: StringArray
) => {
  const x = currentPosition[1], y = currentPosition[0]

  let newPositions = (moved) ? 
    ((fromTop) ? 
      [[x, ((y+1 <= 7) ? y+1 : null)]] : 
      [[x, ((y-1 >= 0) ? y-1 : null)]]
    ) : 
    ((fromTop) ? 
      [[x, ((y+1 <= 7) ? y+1 : null)], [x, ((y+2 <= 7) ? y+2 : null)]] : 
      [[x, ((y - 1 >= 0) ? y - 1 : null)], [x, ((y - 2 >= 0) ? y - 2 : null)]]
    );
  newPositions = newPositions.filter(position => {
    return !occupied.includes(JSON.stringify([position[1], position[0]]))
  })
  pawnKill([x, y], fromTop).forEach((point) => {
    if (occupied.includes(JSON.stringify([point[1], point[0]]))) {
      newPositions.push(point);
    }
  })
  return reversePositions(newPositions);
}

const pawnKill = (currentPosition: NumberArray, fromTop: boolean) => {
  const x = currentPosition[1], y = currentPosition[0]

  // const newPositions = fromTop ? [moveLeftDown(currentPosition)[0], moveRightDown(currentPosition)[0]] :
  //   [moveLeftUp(currentPosition)[0], moveRightUp(currentPosition)[0]]
  
  const newPositions = (fromTop) ? 
    [
      [((x+1 <= 7) ? x+1 : null), ((y+1 <= 7) ? y+1 : null)],
      [((x + 1 <= 7) ? x + 1 : null), ((y - 1 >= 0) ? y - 1 : null)]
    ] :
    [
      [((x - 1 >= 0) ? x - 1 : null), ((y + 1 <= 7) ? y + 1 : null)],
      [((x - 1 >= 0) ? x - 1 : null), ((y - 1 >= 0) ? y - 1 : null)]
    ]
      
  console.log(newPositions.filter((pos) => !pos.includes(null)))
  return reversePositions(newPositions);
}

export {
  kingMove, 
  queenMove,
  bishopMove, 
  knightMove, 
  rookMove, 
  pawnMove, 
  pawnKill,
}

const moves: MovesType = {
  kingMove, 
  queenMove, 
  bishopMove, 
  knightMove, 
  rookMove, 
  pawnMove,
  pawnKill,
}

export default moves