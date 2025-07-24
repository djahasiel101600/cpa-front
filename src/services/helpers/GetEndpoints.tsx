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

export function UseGetEndpointData<T>(endpoint: string, criteria: boolean) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<ErrorShape>();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (criteria === true) {
      axios_instance
        .get<T[]>(endpoint, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          setError(err as ErrorShape);
        });
    }
  }, []);

  return { data, error, criteria };
}
