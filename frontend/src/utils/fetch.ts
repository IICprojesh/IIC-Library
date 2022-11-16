import axios, { AxiosRequestConfig } from "axios";

export const URI: string = process.env.REACT_APP_BACKEND_API!;

export function fetchData(
  uri: string,
  options?: AxiosRequestConfig<any> | undefined
) {
  return axios(`${URI}/${uri}`, options).then((data) => data.data);
}
