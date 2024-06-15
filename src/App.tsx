import { useEffect, useMemo, useState } from "react";

import axios from "axios";

async function getUser(user: WebAppUser) {
  if (!user) return "do not have anything";

  try {
    const data = await axios.post(
      "http://localhost:3000/users/find_or_create_user",
      {
        _id: user.id,
        name: user.username
      }
    );

    return data.data;
  } catch (error) {
    return error;
  }
}

function App() {
  const [user, setUser] = useState<any>(null);

  const tg = useMemo(() => {
    return window.Telegram.WebApp;
  }, []);

  useEffect(() => {
    if (tg && tg.initDataUnsafe.user) {
      getUser(tg.initDataUnsafe.user).then((data) => {
        setUser(data);
      });
    }
  }, [tg]);

  return (
    <div>
      <div>{JSON.stringify(user)}</div>

      <div>------------------------------------</div>

      <div>{JSON.stringify(tg.initDataUnsafe.user)}</div>
    </div>
  );
}

export default App;
