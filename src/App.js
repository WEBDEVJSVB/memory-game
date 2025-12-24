import { useState } from 'react';
import Cards from './components/Cards';

function App() {
  const [resetKey, setResetKey] = useState(0);
  const [moves, setMoves] = useState(0);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
    setMoves(0);
  };

  const addMove = () => {
    setMoves(prev => prev + 1);
  };

  return (
    <div className="App">
      <h1>Memory Dev</h1>
      
      <div className="stats-bar">
        <span>Movimientos: {moves}</span>
        <button onClick={handleReset}>Nuevo Juego</button>
      </div>
      <Cards key={resetKey} addMove={addMove} />
    </div>
  );
}

export default App;