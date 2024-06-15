import { useEffect, useMemo, useState } from "react";

import axios from "axios";

async function getUser(user: WebAppUser) {
  const { id, username, photo_url } = user;

  try {
    const data = await axios.post(
      "http://localhost:3000/users/find_or_create_user",
      {
        _id: id,
        image: photo_url,
        name: username
      }
    );

    return data.data;
  } catch (error) {
    console.log(error);
  }
}

function App() {
  const [user, setUser] = useState<any>(null);

  const tg = useMemo(() => {
    return window.Telegram.WebApp;
  }, []);

  useEffect(() => {
    if (tg && tg.initDataUnsafe.user) setUser(getUser(tg.initDataUnsafe.user));
  }, [tg]);

  return <div>{user ? <>{JSON.stringify(user)}</> : <>{undefined}</>}</div>;
}

export default App;
