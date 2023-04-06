import React, { useEffect, useState } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees } from "./actions/employeesActions";
import { AppDispatch } from "./store";
import Employeestable from "./components/EmployeesTable";
import { Button, TextField, Typography, debounce } from "@mui/material";
import { Employee } from "./util/types";
import AddEmployee from "./components/AddEmployee";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const employees: Employee[] = useSelector(
    (state: any) => state.employeesReducer.employeeList
  );
  const nextCursor = useSelector(
    (state: any) => state.employeesReducer.nextCursor
  );
  const prevCursor = useSelector(
    (state: any) => state.employeesReducer.prevCursor
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(fetchEmployees(searchKeyword, cursor, limit, abortController));
    return () => {
      abortController.abort();
    };
  }, [searchKeyword, dispatch, cursor]);

  const handleSearch = debounce((searchVal: string) => {
    setCursor(null);
    setLimit(5);
    const searchStr = searchVal.trim().toLowerCase();

    // Once the input value cleared, clear the search result
    if (searchStr === "" || searchStr === undefined) {
      setSearchKeyword("");
      return;
    }
    setSearchKeyword(searchStr);
  }, 300);

  return (
    <>
      <Typography variant="h3">Plexxis Employees</Typography>
      <TextField
        id="outlined-basic"
        label="Search Employees"
        variant="outlined"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <Button
        onClick={() => {
          setOpen(true);
        }}
      >
        Add Employee
      </Button>
      <Employeestable employees={employees} />
      <Button
        onClick={() => {
          console.log(prevCursor);
          if (prevCursor) {
			dispatch(fetchEmployees(searchKeyword, prevCursor, -5))
          }
        }}
        disabled={prevCursor === null}
      >
        Previous Page
      </Button>
      <Button
        onClick={() => {
          console.log(nextCursor);
          if (nextCursor) {
			dispatch(fetchEmployees(searchKeyword, nextCursor, 5))
          }
        }}
        disabled={nextCursor === null}
      >
        Next Page
      </Button>
      <AddEmployee open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default App;
