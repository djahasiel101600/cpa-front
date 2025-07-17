import { useEffect, useState } from "react";
import { axios_instance } from "../Api";

export function UseEndpointData<T>(endpoint: string) {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    axios_instance.get<T[]>(endpoint).then((res) => {
      setData(res.data);
    });
  }, []);

  return data;
}
