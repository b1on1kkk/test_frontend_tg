import { useEffect, useMemo, useState } from "react";

import axios, { AxiosError } from "axios";

interface User {
  image: string;
  name: string;
  teamId: string | null;
  userLevel: number;
  language: string;
  vibration: boolean;
  coinAnimation: boolean;
  referralsCount: number;
}

interface DataResponse {
  message: string;
  user: User;
}

async function getUser(user: WebAppUser): Promise<DataResponse | AxiosError> {
  try {
    const data = await axios.post<DataResponse>(
      "http://localhost:3000/users/find_or_create_user",
      {
        _id: user.id,
        name: user.username
      }
    );

    return data.data;
  } catch (error) {
    return error as AxiosError;
  }
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const tg = useMemo(() => {
    return window.Telegram.WebApp;
  }, []);

  useEffect(() => {
    if (tg) tg.ready();

    if (tg && tg.initDataUnsafe.user) {
      getUser(tg.initDataUnsafe.user).then(
        (data: AxiosError | DataResponse) => {
          if (data instanceof AxiosError) setError(data);
          else setUser(data.user);
        }
      );
    }

    return () => {
      tg.close();
    };
  }, [tg]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center"
      }}
    >
      {user ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img
              style={{ borderRadius: "9999px" }}
              src={user.image}
              alt="user image"
            />
          </div>

          <div>{JSON.stringify(user, null, 2)}</div>
        </>
      ) : (
        <>Loading...</>
      )}

      <div>{JSON.stringify(error)}</div>
    </div>
  );
}

export default App;
