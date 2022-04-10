import { GameProvider } from "./context/GameContext";
import "./App.css";
import Game from "./components/game/Game";

function App() {
  return (
    <div>
      <header className="text-center mb-4">
        <h1>Nonogram</h1>
      </header>
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default App;
