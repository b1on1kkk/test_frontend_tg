import "./App.css";

const tg = window.Telegram.WebApp;

function App() {
  return <>{tg.initDataUnsafe.user}</>;
}

export default App;
