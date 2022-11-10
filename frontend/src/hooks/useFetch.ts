import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetch";

export function useFetch(
  resourceUri: string,
  options?: AxiosRequestConfig<any>
): { data: any; loading: boolean; error: any } {
  const [data, setData] = useState<any | any[]>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null);
    setLoading(true);
    setError(null);
    const source = axios.CancelToken.source();
    fetchData(resourceUri, options)
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => source.cancel();
  }, [resourceUri, options]);
  return { data, loading, error };
}
