export type Employee = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: boolean;
};

export interface FetchEmployeesResponse {
  data: Employee[];
  nextCursor: number | null;
  prevCursor: number | null;
}
