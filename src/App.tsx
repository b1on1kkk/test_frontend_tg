import axios, { AxiosError } from "axios";

import { useQuery } from "@tanstack/react-query";

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
  error: boolean;
  message: string;
  user: User;
}

const tg = window.Telegram.WebApp;

const useFindOrLoggedInUser = <T extends DataResponse>(
  user: WebAppUser | undefined
) => {
  return useQuery<T, AxiosError | Error>({
    queryKey: ["find_or_create_user"],
    queryFn: async () => {
      if (!user) throw new Error("User is undefined");

      const response = await axios.post<T>(
        "http://localhost:3001/users/find_or_create_user",
        {
          _id: user.id,
          name: user.first_name
        }
      );

      return response.data;
    }
  });
};

function App() {
  const { data, error } = useFindOrLoggedInUser<DataResponse>(
    tg.initDataUnsafe.user
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center"
      }}
    >
      {data ? (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img
              style={{ borderRadius: "9999px" }}
              src={data.user.image}
              alt="user image"
            />
          </div>

          <div>{JSON.stringify(data.user, null, 2)}</div>
        </>
      ) : (
        <>Loading...</>
      )}

      <br></br>

      <div>-------------------Error below--------------------</div>

      <br></br>

      <>
        {error instanceof AxiosError ? (
          <div>{JSON.stringify(error?.response?.data)}</div>
        ) : (
          <div>{JSON.stringify(error)}</div>
        )}
      </>
    </div>
  );
}

export default App;
