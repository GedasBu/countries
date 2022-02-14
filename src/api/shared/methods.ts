import axios, { AxiosResponse } from "axios";

export function get<T>(url: string): Promise<AxiosResponse<T>> {
  return axios.get<T>(`https://restcountries.com/v2/${url}`);
}
