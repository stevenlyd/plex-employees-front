import { Resolver, useForm, SubmitHandler } from "react-hook-form";
import { Employee } from "../util/types";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { deleteEmployee, updateEmployees } from "../actions/employeesActions";

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

export default function EditEmployeeForm({ employee, onClose }: { employee: Employee, onClose: () => void }) {
  const { updatedAt, createdAt, id, ...defaultValues } = employee;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver, defaultValues: defaultValues });
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { updatedAt, createdAt, ...toBeSubmitted } = { ...employee, ...data };
    dispatch(updateEmployees(toBeSubmitted));
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
        <Button
          type={isEdit ? "button" : "submit"}
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        >
          {isEdit ? "Submit" : "Edit"}
        </Button>
        <Button 
        type="button"
        onClick={() => {
          dispatch(deleteEmployee(employee.id))
          onClose()
        }}>Delete Employee</Button>
      </form>
    </>
  );
}