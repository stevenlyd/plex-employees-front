import { API } from "../util/config";
import { FetchEmployeesResponse } from "../util/types";
import { Employee } from "../util/types";

export const employeesActionTypes = {
  FETCH_EMPLOYEES: "FETCH_EMPLOYEES",
  FETCH_EMPLOYEES_SUCCESS: "FETCH_DATA_SUCCESS",
  FETCH_EMPLOYEES_FAILURE: "FETCH_DATA_FAILURE",
  UPDATE_EMPLOYEES: "UPDATE_EMPLOYEES",
  UPDATE_EMPLOYEES_SUCCESS: "UPDATE_DATA_SUCCESS",
  UPDATE_EMPLOYEES_FAILURE: "UPDATE_DATA_FAILURE",
};

export interface FetchEmployeesRequestAction {
  type: typeof employeesActionTypes.FETCH_EMPLOYEES;
}

export interface FetchEmployeesSuccessAction {
  type: typeof employeesActionTypes.FETCH_EMPLOYEES_SUCCESS;
  payload: FetchEmployeesResponse;
}

export interface FetchEmployeesFailureAction {
  type: typeof employeesActionTypes.FETCH_EMPLOYEES_FAILURE;
  payload: string;
}

export interface UpdateEmployeesRequestAction {
  type: typeof employeesActionTypes.UPDATE_EMPLOYEES;
}

export interface UpdateEmployeesSuccessAction {
  type: typeof employeesActionTypes.UPDATE_EMPLOYEES_SUCCESS;
}

export interface UpdateEmployeesFailureAction {
  type: typeof employeesActionTypes.UPDATE_EMPLOYEES_FAILURE;
  payload: string;
}

export const fetchEmployees =
  (
    searchKeyword: string = "",
    cursor: number | null = null,
    limit: number = 5,
    abortController: AbortController = new AbortController()
  ) =>
  async (dispatch: any) => {
    dispatch(fetchEmployeesRequest());
    try {
      const response = await fetch(
        API +
          "?" +
          new URLSearchParams(
            cursor
              ? {
                  keyword: searchKeyword!,
                  limit: limit.toString(),
                  cursor: cursor.toString(),
                }
              : {
                  keyword: searchKeyword!,
                  limit: limit.toString(),
                }
          ),
        {
          method: "GET",
          signal: abortController.signal,
        }
      );
      setTimeout(() => abortController.abort(), 5000);
      const data: FetchEmployeesResponse = await response.json();
      dispatch(
        fetchEmployeesSuccess(data.data, data.nextCursor, data.prevCursor)
      );
    } catch (error: any) {
      dispatch(fetchEmployeesFailure(error.message));
    }
  };

export const fetchEmployeesRequest = (): FetchEmployeesRequestAction => {
  return {
    type: employeesActionTypes.FETCH_EMPLOYEES,
  };
};

export const fetchEmployeesSuccess = (
  data: Employee[],
  nextCursor: number | null,
  prevCursor: number | null
): FetchEmployeesSuccessAction => {
  return {
    type: employeesActionTypes.FETCH_EMPLOYEES_SUCCESS,
    payload: { data, nextCursor, prevCursor },
  };
};

export const fetchEmployeesFailure = (
  error: string
): FetchEmployeesFailureAction => {
  return {
    type: employeesActionTypes.FETCH_EMPLOYEES_FAILURE,
    payload: error,
  };
};

export const updateEmployees =
  (employee: Omit<Employee, "createdAt" | "updatedAt">) =>
  async (dispatch: any) => {
    dispatch(updateEmployeesRequest());
    try {
      await fetch(`${API}/${employee.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      dispatch(updateEmployeesSuccess());
      dispatch(fetchEmployees());
    } catch (error: any) {
      dispatch(updateEmployeesFailure(error.message));
    }
  };

export const updateEmployeesRequest = (): UpdateEmployeesRequestAction => {
  return {
    type: employeesActionTypes.UPDATE_EMPLOYEES,
  };
};

export const updateEmployeesSuccess = (): UpdateEmployeesSuccessAction => {
  return {
    type: employeesActionTypes.UPDATE_EMPLOYEES_SUCCESS,
  };
};

export const updateEmployeesFailure = (
  error: string
): UpdateEmployeesFailureAction => {
  return {
    type: employeesActionTypes.UPDATE_EMPLOYEES_FAILURE,
    payload: error,
  };
};

export const addEmployee =
  (employee: Omit<Employee, "id" | "createdAt" | "updatedAt" | "isDeleted">) =>
  async (dispatch: any) => {
    try {
      await fetch(API!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      dispatch(fetchEmployees());
    } catch (error: any) {
      console.log(error);
    }
  };

export const deleteEmployee = (id: number) => async (dispatch: any) => {
  try {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    dispatch(fetchEmployees());
  } catch (error: any) {
    console.log(error);
  }
};
