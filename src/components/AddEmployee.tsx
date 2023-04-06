import { Dialog, Typography } from "@mui/material";
import AddEmployeeForm from "./AddEmployeeForm";

interface AddEmployeeProps {
    open: boolean;
    onClose: () => void;
}

export default function AddEmployee(AddEmployeeProps: AddEmployeeProps) {
  const { open, onClose } = AddEmployeeProps;
  return (
    <Dialog disableScrollLock open={open} onClose={onClose}>
      {
        <>
          <Typography variant="h4">Add Employee Profile</Typography>
          <AddEmployeeForm onClose={onClose}/>
        </>
      }
    </Dialog>
  );
}