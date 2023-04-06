import { useState } from "react";

import { Button, TextField } from "@mui/material";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
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

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
          lastName: {
            type: "required",
            message: "This is required.",
          },
          email: {
            type: "required",
            message: "This is required.",
          },
          phone: {
            type: "required",
            message: "This is required.",
          },
          department: {
            type: "required",
            message: "This is required.",
          },
          position: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

function extractEmployeeDetails(employee?: Employee) {
  if (!employee) {
    return;
  }

  const {
    id,
    createdAt,
    updatedAt,
    ...otherDetails
  } = employee;

  return otherDetails;
}

export default function EditEmployeeForm({
  employee,
  onClose,
}: {
  employee?: Employee;
  onClose: () => void;
}) {
  const defaultValues = extractEmployeeDetails(employee); //Extracts the employee details from the employee object, removes the id, createdAt, and updatedAt properties
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver,
    defaultValues: defaultValues?? undefined,
  });
  const [isEdit, setIsEdit] = useState(employee ? false : true);
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
      onClose()
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("firstName")}
          label="First Name"
          disabled={!isEdit}
        />
        <TextField
          {...register("lastName")}
          label="Last Name"
          disabled={!isEdit}
        />
        <TextField
          type="email"
          {...register("email")}
          label="Email"
          disabled={!isEdit}
        />
        <TextField
          type="tel"
          {...register("phone")}
          label="Phone Number"
          disabled={!isEdit}
        />
        <TextField
          {...register("department")}
          label="Department"
          disabled={!isEdit}
        />
        <TextField
          {...register("position")}
          label="Position"
          disabled={!isEdit}
        />
        {!employee && <Button type="submit">Add Employee</Button>}
        {employee && (
          <Button
            type={isEdit ? "button" : "submit"}
            onClick={() => {
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
    </>
  );
}
