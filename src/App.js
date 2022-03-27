import { GameProvider } from "./context/GameContext";
import "./App.css";
import Game from "./components/Game";

function App() {
  return (
    <div>
      <header className="text-center">
        <h1>Nonogram</h1>
      </header>
      <GameProvider>
        <Game />
      </GameProvider>
    </div>
  );
}

export default App;
