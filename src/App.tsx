import { useMemo } from "react";
import "./App.css";

function App() {
  const tg = useMemo(() => {
    return window.Telegram.WebApp;
  }, []);

  const user_data = useMemo(() => {
    if (tg) return tg.initDataUnsafe;
  }, [tg]);

  return <div>{user_data ? <>{user_data}</> : <>{undefined}</>}</div>;
}

export default App;
