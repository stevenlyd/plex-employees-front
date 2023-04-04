import React, { useEffect, useState } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees } from './actions/employeesActions';
import { AppDispatch } from './store';
import Employeestable from './components/EmployeesTable';
import { TextField, debounce } from '@mui/material';

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const employees = useSelector(
		(state: any) => state.employeesReducer.employeeList
	);
  const [searchKeyword, setSearchKeyword] = useState('');

	useEffect(() => {
		dispatch(fetchEmployees(searchKeyword));
	}, [searchKeyword, dispatch]);

  const handleSearch = debounce((searchVal: string) => {
    const searchStr = searchVal.trim().toLowerCase()

    // Once the input value cleared, clear the search result
    if (searchStr === '' || searchStr === undefined) {
      setSearchKeyword('')
        return
    }

    setSearchKeyword(searchStr)
    console.log(searchStr)
}, 300)

	return (
		<>
			<Employeestable employees={employees} />
			<TextField id="outlined-basic" label="Search Employees" variant="outlined" onChange={(e) => {
        handleSearch(e.target.value)
      }}/>
		</>
	);
}

export default App;
