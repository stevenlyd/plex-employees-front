import { css } from "@emotion/css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  SxProps,
  Typography,
} from "@mui/material";

import { Employee } from "../util/types";
import ConfigureEmployeeForm from "./ConfigureEmployeeForm";

interface ConfigureEmployeeModalProps {
  open: boolean;
  onClose: () => void;
  employee?: Employee;
}

export default function ConfigureEmployeeModal(
  EditEmployeeProps: ConfigureEmployeeModalProps
) {
  const { open, onClose, employee } = EditEmployeeProps;

  const styles = {
    dialogContent: {
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
    } as SxProps,
  };

  return (
    <Dialog disableScrollLock open={open} onClose={onClose}>
      {
        <>
          <DialogTitle>
            {employee ? "Edit Employee Profile" : "Add Employee Profile"}
          </DialogTitle>
          <DialogContent sx={styles.dialogContent}>
            <ConfigureEmployeeForm employee={employee} onClose={onClose} />
          </DialogContent>
        </>
      }
    </Dialog>
  );
}
