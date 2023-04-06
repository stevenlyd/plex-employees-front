import { Employee } from "./types";

export interface FetchEmployeesResponse {
  data: Employee[];
  nextCursor: number | null;
  prevCursor: number | null;
}
