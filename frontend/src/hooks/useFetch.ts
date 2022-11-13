import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { fetchData } from "../utils/fetch";

export function useFetch(
  resourceUri: string,
  options?: AxiosRequestConfig<any> & { fetch?: boolean }
): { data: any; loading: boolean; error: any } {
  if (!options) {
    options = {};
  }
  if (!options.fetch) {
    options.fetch = true;
  }
  const [data, setData] = useState<any | any[]>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    if (options?.fetch === true) {
      setLoading(true);
      setError(null);
      setData(null);
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
    }

    return () => source.cancel();
  }, [resourceUri, options]);
  return { data, loading, error };
}
