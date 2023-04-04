import {
	FetchEmployeesFailureAction,
	FetchEmployeesRequestAction,
	FetchEmployeesSuccessAction,
	employeesActionTypes,
} from '../actions/employeesActions';
import { Employee } from '../util/types';

type AsyncActionTypes =
	| FetchEmployeesRequestAction
	| FetchEmployeesSuccessAction
	| FetchEmployeesFailureAction;

export interface States {
	employeeList: Employee[];
	loading: boolean;
	error: string | null;
}

const initialState: States = {
	employeeList: [],
	loading: false,
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
      console.log(successAction.payload);
			return {
				...state,
				employeeList: successAction.payload,
				loading: false,
				error: null,
			};
		case employeesActionTypes.FETCH_EMPLOYEES_FAILURE:
			const failureAction = action as FetchEmployeesFailureAction;
			return { ...state, error: failureAction.payload, loading: false };
	}
};
