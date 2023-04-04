import { Dialog, Typography } from "@mui/material";
import { Employee } from "../util/types";

interface EditEmployeeProps {
    open: boolean,
    onClose: () => void,
    employee: Employee | null,
}

export default function EditEmployee(EditEmployeeProps: EditEmployeeProps) {
    const { open, onClose, employee } = EditEmployeeProps;
    return (
        <Dialog 
        disableScrollLock
         open={open} onClose={onClose}
         >
            {
                <>
                <Typography variant="h4">
                    Edit Employee Profile
                </Typography>
                
                 <button onClick={() => {

                    onClose()
                 }}>Done</button>
                </>
            }
        </Dialog>
    )
}