import { Dialog, Typography } from "@mui/material";

import { Employee } from "../util/types";
import EditEmployeeForm from "./EditEmployeeForm";

interface EditEmployeeProps {
  open: boolean;
  onClose: () => void;
  employee: Employee;
}

export default function EditEmployee(EditEmployeeProps: EditEmployeeProps) {
  const { open, onClose, employee } = EditEmployeeProps;
  return (
    <Dialog disableScrollLock open={open} onClose={onClose}>
      {
        <>
          <Typography variant="h4">Edit Employee Profile</Typography>
          <EditEmployeeForm employee={employee} onClose={onClose} />
        </>
      }
    </Dialog>
  );
}
