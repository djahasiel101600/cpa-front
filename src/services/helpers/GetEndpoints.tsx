import { useEffect, useState } from "react";
import { axios_instance } from "../Api";

interface ErrorShape {
  message: string;
  name: string;
  response?: {
    status: number;
    data: any;
    headers: any;
    config: any;
  };
  config: any;
  isAxiosError: true;
}

export function UseGetEndpointData<T>(
  endpoint: string,
  criteria: boolean | undefined
) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<ErrorShape>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoading(true);
    if (criteria === true) {
      axios_instance
        .get<T[]>(endpoint, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((res) => setData(res.data))
        .catch((err) => {
          setError(err as ErrorShape);
          console.log("Something went wrong: ", error);
        })
        .finally(() => setIsLoading(false));
    }
  }, [criteria, endpoint]);

  return { data, error, criteria, isLoading };
}
