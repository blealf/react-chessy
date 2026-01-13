import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import kingB from '../assets/images/kingB.svg';
import queenB from '../assets/images/queenB.svg';
import bishopB from '../assets/images/bishopB.svg';
import knightB from '../assets/images/knightB.svg';
import rookB from '../assets/images/rookB.svg';
import pawnB from '../assets/images/pawnB.svg';
import kingW from '../assets/images/kingW.svg';
import queenW from '../assets/images/queenW.svg';
import bishopW from '../assets/images/bishopW.svg';
import knightW from '../assets/images/knightW.svg';
import rookW from '../assets/images/rookW.svg';
import pawnW from '../assets/images/pawnW.svg';

const KilledSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`

/* This code defines a React functional component called `KilledPieces`.
  It renders the chess pieces that have been killed 
*/
const KilledPieces = () => {
  const [blackKilled, setBlackKilled] = useState([])
  const [whiteKilled, setWhiteKilled] = useState([])
  const killed = useSelector((store: any) => store.game.killed)

  const chessPieces = {
    kingB,
    queenB,
    bishopB,
    knightB,
    rookB,
    pawnB,
    kingW,
    queenW,
    bishopW,
    knightW,
    rookW,
    pawnW,
  }
  
  useEffect(() => {
    setBlackKilled(killed.blackKilled)
    setWhiteKilled(killed.whiteKilled)
  }, [killed])

  return (
    <div>
      <KilledSection className="black">
        {blackKilled.map((piece, index) => (
          <img
            key={index}
            src={ chessPieces[piece]}
            alt={piece}
            style={{
              height: "50px",
              width: "50px",
              padding: "0px",
            }}
          />
        ))}
      </KilledSection>
      <KilledSection className="white">
        {whiteKilled.map((piece, index) => (
          <img
            key={index}
            src={chessPieces[piece]}
            alt={piece}
            style={{
              height: "50px",
              width: "50px",
              padding: "0px",
            }}
          />
        ))}
      </KilledSection>
    </div>
  )
}

export default KilledPieces