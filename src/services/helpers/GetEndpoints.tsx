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

export function UseGetEndpointData<T>(endpoint: string, criteria: boolean | undefined) {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<ErrorShape>();

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
    if (criteria === true) {
      try {
        const res = await axios_instance
        .get<T[]>(endpoint, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        setData(res.data)
      } catch (error:any) {
        setError(error);
      }
    }
    }
    fetchData();
  }, [criteria, endpoint]);

  return { data, error, criteria };
}
