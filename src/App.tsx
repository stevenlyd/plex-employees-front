import React, { useEffect, useState } from "react";

import { Add } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBack from "@mui/icons-material/ArrowBackIosNew";
import ArrowForward from "@mui/icons-material/ArrowForwardIos";
import {
  Box,
  debounce,
  IconButton,
  Paper,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { fetchEmployees } from "./actions/employeesActions";
import "./App.css";
import ConfigureEmployeeModal from "./components/ConfigureEmployeeModal";
import Employeestable from "./components/EmployeesTable";
import { AppDispatch, RootState } from "./store";
import { config } from "./util/config";
import { Employee } from "./util/types";

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

  const styles = {
    AppContainer: {
      padding: "20px",
      height: "100vh",
      width: "100vw",
    } as SxProps,
    header: {
      marginBottom: "20px",
    } as SxProps,
    buttonContainer: {
      marginLeft: "20px",
      display: "flex",
      justifyContent: "space-between",
      width: "150px",
    } as SxProps,
    toolBarContaienr: {
      display: "flex",
      marginBottom: "15px",
    } as SxProps,
  };

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
      <Paper sx={styles.AppContainer}>
        <Typography sx={styles.header} variant="h3">
          Plexxis Employees
        </Typography>

        <Box sx={styles.toolBarContaienr}>
          <TextField
            id="outlined-basic"
            label="Search Employees"
            variant="outlined"
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
          <Box sx={styles.buttonContainer}>
            <IconButton
              onClick={() => {
                setOpen(true);
              }}
            >
              <AddIcon />
            </IconButton>
            <IconButton
              onClick={() => {
                if (prevCursor) {
                  dispatch(fetchEmployees(searchKeyword, prevCursor, -limit));
                }
              }}
              disabled={prevCursor === null}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={() => {
                if (nextCursor) {
                  dispatch(fetchEmployees(searchKeyword, nextCursor, limit));
                }
              }}
              disabled={nextCursor === null}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Box>

        <Employeestable employees={employees} />

        <ConfigureEmployeeModal open={open} onClose={() => setOpen(false)} />
      </Paper>
    </>
  );
}

export default App;
