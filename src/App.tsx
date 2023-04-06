import React, { useEffect, useState } from "react";

import { Button, debounce, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { fetchEmployees } from "./actions/employeesActions";
import "./App.css";
import Employeestable from "./components/EmployeesTable";
import { AppDispatch, RootState } from "./store";
import { config } from "./util/config";
import { Employee } from "./util/types";
import ConfigureEmployeeModal from "./components/ConfigureEmployeeModal";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const employees: Employee[] = useSelector(
    (state: RootState) => state.employeesReducer.employeeList
  );
  const nextCursor = useSelector(
    (state: RootState) => state.employeesReducer.nextCursor
  );
  const prevCursor = useSelector(
    (state: RootState) => state.employeesReducer.prevCursor
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(null);
  const limit = config.PAGE_LIMIT;

  useEffect(() => {
    const abortController = new AbortController();
    dispatch(fetchEmployees(searchKeyword, cursor, limit, abortController));
    return () => {
      abortController.abort();
    };
  }, [searchKeyword, dispatch, cursor]);

  const handleSearch = debounce((searchVal: string) => {
    setCursor(null);
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
          if (prevCursor) {
            dispatch(fetchEmployees(searchKeyword, prevCursor, -limit));
          }
        }}
        disabled={prevCursor === null}
      >
        Previous Page
      </Button>
      <Button
        onClick={() => {
          if (nextCursor) {
            dispatch(fetchEmployees(searchKeyword, nextCursor, limit));
          }
        }}
        disabled={nextCursor === null}
      >
        Next Page
      </Button>
      {/* <AddEmployee open={open} onClose={() => setOpen(false)} /> */}
      <ConfigureEmployeeModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

export default App;
