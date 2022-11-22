import axios, { AxiosRequestConfig } from "axios";
import { BACKEND_ENDPOINT } from '../constants/constants';

export const URI: string = BACKEND_ENDPOINT!;

export function fetchData(
  uri: string,
  options?: AxiosRequestConfig<any> | undefined
) {
  return axios(`${URI}/${uri}`, options).then((data) => data.data);
}
