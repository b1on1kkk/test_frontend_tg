import { useMemo } from "react";
import "./App.css";

function App() {
  const tg = useMemo(() => {
    return window.Telegram.WebApp;
  }, []);

  console.log(tg);

  const user_data = useMemo(() => {
    if (tg) return tg.initDataUnsafe;
  }, [tg]);

  return (
    <div>{user_data ? <>{JSON.stringify(user_data)}</> : <>{undefined}</>}</div>
  );
}

export default App;
