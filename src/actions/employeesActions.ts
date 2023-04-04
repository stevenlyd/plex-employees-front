import { Employee } from '../util/types';

export const employeesActionTypes = {
	FETCH_EMPLOYEES: 'FETCH_EMPLOYEES',
	FETCH_EMPLOYEES_SUCCESS: 'FETCH_DATA_SUCCESS',
	FETCH_EMPLOYEES_FAILURE: 'FETCH_DATA_FAILURE',
};

export interface FetchEmployeesRequestAction {
	type: typeof employeesActionTypes.FETCH_EMPLOYEES;
}

export interface FetchEmployeesSuccessAction {
	type: typeof employeesActionTypes.FETCH_EMPLOYEES_SUCCESS;
	payload: Employee[];
}

export interface FetchEmployeesFailureAction {
	type: typeof employeesActionTypes.FETCH_EMPLOYEES_FAILURE;
	payload: string;
}

export const fetchEmployees =
	(searchKeyword?: string) => async (dispatch: any) => {
		dispatch(fetchEmployeesRequest(searchKeyword!));
		try {
			const response = await fetch(
				'http://localhost:3001/employees?' +
					new URLSearchParams({
						keyword: searchKeyword!,
					}),
				{
					method: 'GET',
				}
			);
			const data = await response.json();
			dispatch(fetchEmployeesSuccess(data));
		} catch (error: any) {
			dispatch(fetchEmployeesFailure(error.message));
		}
	};

export const fetchEmployeesRequest = (
	searchKeyword: string
): FetchEmployeesRequestAction => {
	return {
		type: employeesActionTypes.FETCH_EMPLOYEES,
	};
};

export const fetchEmployeesSuccess = (
	data: Employee[]
): FetchEmployeesSuccessAction => {
	return {
		type: employeesActionTypes.FETCH_EMPLOYEES_SUCCESS,
		payload: data,
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
