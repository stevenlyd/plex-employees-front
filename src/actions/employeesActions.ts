import { API } from "../util/config";
import { FetchEmployeesResponse } from "../util/types";
import { Employee } from "../util/types";

export const employeesActionTypes = {
  FETCH_EMPLOYEES: "FETCH_EMPLOYEES",
  FETCH_EMPLOYEES_SUCCESS: "FETCH_EMPLOYEES_SUCCESS",
  FETCH_EMPLOYEES_FAILURE: "FETCH_EMPLOYEES_FAILURE",
  UPDATE_EMPLOYEE: "UPDATE_EMPLOYEE",
  UPDATE_EMPLOYEE_SUCCESS: "UPDATE_EMPLOYEE_SUCCESS",
  UPDATE_EMPLOYEE_FAILURE: "UPDATE_EMPLOYEE_FAILURE",
  ADD_EMPLOYEE: "ADD_EMPLOYEE",
  ADD_EMPLOYEE_SUCCESS: "ADD_EMPLOYEE_SUCCESS",
  ADD_EMPLOYEE_FAILURE: "ADD_EMPLOYEE_FAILURE",
  DELETE_EMPLOYEE: "DELETE_EMPLOYEE",
  DELETE_EMPLOYEE_SUCCESS: "DELETE_EMPLOYEE_SUCCESS",
  DELETE_EMPLOYEE_FAILURE: "DELETE_EMPLOYEE_FAILURE",
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
  type: typeof employeesActionTypes.UPDATE_EMPLOYEE;
}

export interface UpdateEmployeesSuccessAction {
  type: typeof employeesActionTypes.UPDATE_EMPLOYEE_SUCCESS;
}

export interface UpdateEmployeesFailureAction {
  type: typeof employeesActionTypes.UPDATE_EMPLOYEE_FAILURE;
  payload: string;
}

export interface AddEmployeesRequestAction {
  type: typeof employeesActionTypes.ADD_EMPLOYEE;
}

export interface AddEmployeesSuccessAction {
  type: typeof employeesActionTypes.ADD_EMPLOYEE_SUCCESS;
}

export interface AddEmployeesFailureAction {
  type: typeof employeesActionTypes.ADD_EMPLOYEE_FAILURE;
  payload: string;
}

export interface DeleteEmployeesRequestAction {
  type: typeof employeesActionTypes.DELETE_EMPLOYEE;
}

export interface DeleteEmployeesSuccessAction {
  type: typeof employeesActionTypes.DELETE_EMPLOYEE_SUCCESS;
}

export interface DeleteEmployeesFailureAction {
  type: typeof employeesActionTypes.DELETE_EMPLOYEE_FAILURE;
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
    type: employeesActionTypes.UPDATE_EMPLOYEE,
  };
};

export const updateEmployeesSuccess = (): UpdateEmployeesSuccessAction => {
  return {
    type: employeesActionTypes.UPDATE_EMPLOYEE_SUCCESS,
  };
};

export const updateEmployeesFailure = (
  error: string
): UpdateEmployeesFailureAction => {
  return {
    type: employeesActionTypes.UPDATE_EMPLOYEE_FAILURE,
    payload: error,
  };
};

export const addEmployee =
  (employee: Omit<Employee, "id" | "createdAt" | "updatedAt" | "isDeleted">) =>
  async (dispatch: any) => {
    dispatch(addEmployeesRequest());
    try {
      await fetch(API!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      });
      dispatch(addEmployeesSuccess());
      dispatch(fetchEmployees());
    } catch (error: any) {
      dispatch(addEmployeesFailure(error.message));
    }
  };

export const addEmployeesRequest = (): AddEmployeesRequestAction => {
  return {
    type: employeesActionTypes.ADD_EMPLOYEE,
  };
};

export const addEmployeesSuccess = (): AddEmployeesSuccessAction => {
  return {
    type: employeesActionTypes.ADD_EMPLOYEE_SUCCESS,
  };
};

export const addEmployeesFailure = (
  error: string
): AddEmployeesFailureAction => {
  return {
    type: employeesActionTypes.ADD_EMPLOYEE_FAILURE,
    payload: error,
  };
};

export const deleteEmployee = (id: number) => async (dispatch: any) => {
  dispatch(deleteEmployeesRequest());
  try {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });
    dispatch(fetchEmployees());
    dispatch(deleteEmployeesSuccess());
  } catch (error: any) {
    dispatch(deleteEmployeesFailure(error.message));
  }
};

export const deleteEmployeesRequest = (): DeleteEmployeesRequestAction => {
  return {
    type: employeesActionTypes.DELETE_EMPLOYEE,
  };
};

export const deleteEmployeesSuccess = (): DeleteEmployeesSuccessAction => {
  return {
    type: employeesActionTypes.DELETE_EMPLOYEE_SUCCESS,
  };
};

export const deleteEmployeesFailure = (
  error: string
): DeleteEmployeesFailureAction => {
  return {
    type: employeesActionTypes.DELETE_EMPLOYEE_FAILURE,
    payload: error,
  };
};
