import { Countries } from "./types";
import { get } from "../shared/methods";

export async function getCountries(): Promise<Countries[]> {
  const { data } = await get<Countries[]>(`all?fields=name,region,area`);
  return data;
}
