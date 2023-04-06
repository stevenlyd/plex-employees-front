import {
  employeesActionTypes,
  FetchEmployeesFailureAction,
  FetchEmployeesRequestAction,
  FetchEmployeesSuccessAction,
  UpdateEmployeesSuccessAction,
} from "../actions/employeesActions";
import { Employee } from "../util/types";

type AsyncActionTypes =
  | FetchEmployeesRequestAction
  | FetchEmployeesSuccessAction
  | FetchEmployeesFailureAction;

export interface States {
  employeeList: Employee[];
  nextCursor: number | null;
  prevCursor: number | null;
  loading: boolean;
  submitting: boolean;
  error: string | null;
}

const initialState: States = {
  employeeList: [],
  loading: false,
  nextCursor: null,
  prevCursor: null,
  submitting: false,
  error: null,
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
    case employeesActionTypes.UPDATE_EMPLOYEES:
      return { ...state, submitting: true, error: null };
    case employeesActionTypes.UPDATE_EMPLOYEES_SUCCESS:
      return {
        ...state,
        submitting: false,
        error: null,
      };
    case employeesActionTypes.UPDATE_EMPLOYEES_FAILURE:
      const updateFailureAction = action as FetchEmployeesFailureAction;
      return {
        ...state,
        error: updateFailureAction.payload,
        submitting: false,
      };
  }
};
