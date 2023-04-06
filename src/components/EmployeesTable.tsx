import { useMemo, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useTable } from "react-table";

import EditEmployee from "./EditEmployee";

export default function Employeestable({ employees }: { employees: any[] }) {
  const [open, setOpen] = useState(false);
  const [employee, setEmployee] = useState(null);
  const data = useMemo(() => employees, [employees]);
  const columns = useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName",
      },
      {
        Header: "Last Name",
        accessor: "lastName",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Department",
        accessor: "department",
      },
      {
        Header: "Position",
        accessor: "position",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <>
      {employees.length > 0 ? (
        <TableContainer>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <TableRow
                    {...row.getRowProps()}
                    onClick={() => {
                      setEmployee(row.original);
                      setOpen(true);
                    }}
                    hover
                    sx={{ cursor: "pointer" }}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography>Can't find any employee</Typography>
      )}

      {employee && (
        <EditEmployee
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          employee={employee}
        />
      )}
    </>
  );
}
