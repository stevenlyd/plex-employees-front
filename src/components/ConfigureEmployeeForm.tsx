import { useState } from "react";

import { DevTool } from "@hookform/devtools";
import {
  Box,
  Button,
  Container,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import {
  addEmployee,
  deleteEmployee,
  updateEmployees,
} from "../actions/employeesActions";
import { AppDispatch } from "../store";
import { Employee } from "../util/types";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  isDeleted: boolean;
}

function extractEmployeeDetails(employee?: Employee) {
  if (!employee) {
    return;
  }

  const { id, createdAt, updatedAt, ...otherDetails } = employee;

  return otherDetails;
}

export default function ConfigureEmployeeForm({
  employee,
  onClose,
}: {
  employee?: Employee;
  onClose: () => void;
}) {
  const defaultValues = extractEmployeeDetails(employee); //Extracts the employee details from the employee object, removes the id, createdAt, and updatedAt properties
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: defaultValues ?? undefined,
  });

  const [isEdit, setIsEdit] = useState(!employee);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (employee) {
      const { updatedAt, createdAt, ...toBeSubmitted } = {
        ...employee,
        ...data,
      };
      dispatch(updateEmployees(toBeSubmitted));
    } else {
      dispatch(addEmployee(data));
      onClose();
    }
  };

  const styles = {
    formContainer: {
      margin: "10px",
    } as SxProps,
    formSection: {
      margin: "10px",
    } as SxProps,
    error: {
      color: "red",
      minHeight: "1.5rem",
    } as SxProps,
  };

  return (
    <>
      <Container sx={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Box sx={styles.formSection}>
            <TextField
              {...register("firstName", {
                required: {
                  value: true,
                  message: "This is required.",
                },
              })}
              label="First Name"
              disabled={!isEdit}
            />
            <Typography sx={styles.error}>
              {errors.firstName?.message}
            </Typography>
          </Box>
          <Box sx={styles.formSection}>
            <TextField
              {...register("lastName", {
                required: {
                  value: true,
                  message: "This is required.",
                },
              })}
              label="Last Name"
              disabled={!isEdit}
            />
            <Typography sx={styles.error}>
              {errors.lastName?.message}
            </Typography>
          </Box>
          <Box sx={styles.formSection}>
            <TextField
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "This is required.",
                },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Please enter a valid email address",
                },
              })}
              label="Email"
              disabled={!isEdit}
            />
            <Typography sx={styles.error}>{errors.email?.message}</Typography>
          </Box>
          <Box sx={styles.formSection}>
            <TextField
              type="tel"
              {...register("phone", {
                required: {
                  value: true,
                  message: "This is required.",
                },
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid phone number",
                },
              })}
              label="Phone Number"
              disabled={!isEdit}
            />
            <Typography sx={styles.error}>{errors.phone?.message}</Typography>
          </Box>
          <Box sx={styles.formSection}>
            <TextField
              {...register("department", {
                required: {
                  value: true,
                  message: "This is required.",
                },
              })}
              label="Department"
              disabled={!isEdit}
            />
            <Typography sx={styles.error}>
              {errors.department?.message}
            </Typography>
          </Box>
          <Box sx={styles.formSection}>
            <TextField
              {...register("position", {
                required: {
                  value: true,
                  message: "This is required.",
                },
              })}
              label="Position"
              disabled={!isEdit}
            />
            <Typography sx={styles.error}>
              {errors.position?.message}
            </Typography>
          </Box>

          {!employee && <Button type="submit">Add Employee</Button>}
          {employee && (
            <Button
              type={isEdit ? "button" : "submit"}
              onClick={() => {
                if (Object.keys(errors).length !== 0) {
                  return;
                }
                setIsEdit(!isEdit);
              }}
            >
              {isEdit ? "Submit" : "Edit"}
            </Button>
          )}

          {employee && (
            <Button
              type="button"
              onClick={() => {
                dispatch(deleteEmployee(employee.id));
                onClose();
              }}
            >
              Delete Employee
            </Button>
          )}
        </form>
        <DevTool control={control} />
      </Container>
    </>
  );
}
