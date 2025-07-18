import { useEffect, useState } from "react";
import { axios_instance } from "../Api";

export function UseEndpointData<T>(endpoint: string) {
  const authToken = localStorage.getItem("authToken");
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
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
        if (err.status === 401) {
          setError("Unauthorized");
        }
      });
  }, []);

  return { data, error };
}
