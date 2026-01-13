import styled from 'styled-components';
import Board from './components/Board';
import KilledPieces from './components/KilledPieces.tsx'
import './index.css'

const Header = styled.h1`
  text-align: center;
`;

const App = () => {

  return (
    <div className="app">
      <Header>Brown Chess</Header>
      <Board />
      <KilledPieces />
    </div>
  );
}

export default App;
