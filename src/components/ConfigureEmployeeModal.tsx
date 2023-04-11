import { css } from "@emotion/css";
import { Dialog, Typography } from "@mui/material";

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
    header: css`
      margin: 20px;
    `,
  };
  return (
    <Dialog disableScrollLock open={open} onClose={onClose}>
      {
        <>
          <Typography className={styles.header} variant="h4">
            {employee ? "Edit Employee Profile" : "Add Employee Profile"}
          </Typography>
          <ConfigureEmployeeForm employee={employee} onClose={onClose} />
        </>
      }
    </Dialog>
  );
}
