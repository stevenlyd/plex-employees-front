import {
  AddEmployeesFailureAction,
  AddEmployeesRequestAction,
  AddEmployeesSuccessAction,
  employeesActionTypes,
  FetchEmployeesFailureAction,
  FetchEmployeesRequestAction,
  FetchEmployeesSuccessAction,
  UpdateEmployeesFailureAction,
  UpdateEmployeesRequestAction,
  UpdateEmployeesSuccessAction,
} from "../actions/employeesActions";
import { Employee } from "../util/types";

type AsyncActionTypes =
  | FetchEmployeesRequestAction
  | FetchEmployeesSuccessAction
  | FetchEmployeesFailureAction
  | UpdateEmployeesSuccessAction
  | UpdateEmployeesRequestAction
  | UpdateEmployeesFailureAction
  | AddEmployeesSuccessAction
  | AddEmployeesRequestAction
  | AddEmployeesFailureAction;

export interface States {
  employeeList: Employee[];
  nextCursor: number | null;
  prevCursor: number | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
  success: string | null;
}

const initialState: States = {
  employeeList: [],
  loading: false,
  nextCursor: null,
  prevCursor: null,
  submitting: false,
  error: null,
  success: null,
};

export const employeesReducer = (
  state = initialState,
  action: AsyncActionTypes
): States => {
  switch (action.type) {
    case employeesActionTypes.FETCH_EMPLOYEES:
      return { ...state, loading: true, error: null };
    default:
      return state;
    case employeesActionTypes.FETCH_EMPLOYEES_SUCCESS:
      const successAction = action as FetchEmployeesSuccessAction;
      return {
        ...state,
        employeeList: successAction.payload.data,
        nextCursor: successAction.payload.nextCursor,
        prevCursor: successAction.payload.prevCursor,
        loading: false,
        error: null,
      };
    case employeesActionTypes.FETCH_EMPLOYEES_FAILURE:
      const failureAction = action as FetchEmployeesFailureAction;
      return { ...state, error: failureAction.payload, loading: false };
    case employeesActionTypes.UPDATE_EMPLOYEE:
      return { ...state, submitting: true, error: null };
    case employeesActionTypes.UPDATE_EMPLOYEE_SUCCESS:
      const updateSuccessAction = action as UpdateEmployeesSuccessAction;
      return {
        ...state,
        submitting: false,
        error: null,
        success: updateSuccessAction.payload,
      };
    case employeesActionTypes.UPDATE_EMPLOYEE_FAILURE:
      const updateFailureAction = action as FetchEmployeesFailureAction;
      return {
        ...state,
        error: updateFailureAction.payload,
        submitting: false,
      };
    case employeesActionTypes.ADD_EMPLOYEE:
      return { ...state, submitting: true, error: null };
    case employeesActionTypes.ADD_EMPLOYEE_SUCCESS:
      const addSuccessAction = action as AddEmployeesSuccessAction;
      return {
        ...state,
        submitting: false,
        error: null,
        success: addSuccessAction.payload,
      };
    case employeesActionTypes.ADD_EMPLOYEE_FAILURE:
      const addFailureAction = action as FetchEmployeesFailureAction;
      return {
        ...state,
        error: addFailureAction.payload,
        submitting: false,
      };
    case employeesActionTypes.DELETE_EMPLOYEE:
      return { ...state, submitting: true, error: null };
    case employeesActionTypes.DELETE_EMPLOYEE_SUCCESS:
      const deleteSuccessAction = action as UpdateEmployeesSuccessAction;
      return {
        ...state,
        submitting: false,
        error: null,
        success: deleteSuccessAction.payload,
      };
    case employeesActionTypes.DELETE_EMPLOYEE_FAILURE:
      const deleteFailureAction = action as FetchEmployeesFailureAction;
      return {
        ...state,
        error: deleteFailureAction.payload,
        submitting: false,
      };
  }
};
