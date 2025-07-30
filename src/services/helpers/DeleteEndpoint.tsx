import { useEffect, useState } from "react";
import { axios_instance } from "../Api";
import { type ErrorShape } from "@/types/core-types";

export default function UseDeleteEndpoint<T>(
  endpoint: string,
  criteria?: boolean | null
) {
  const [error, setError] = useState<ErrorShape>();
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<number>();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if ((criteria || criteria === null) && authToken !== "") {
      axios_instance
        .delete(endpoint, {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setStatus(response.status);
        })
        .catch((err) => {
          setError(err as ErrorShape);
          console.log(err);
          setStatus(err.response.status);
        });
    }
  }, [criteria, endpoint]);

  return { data, error, status };
}
