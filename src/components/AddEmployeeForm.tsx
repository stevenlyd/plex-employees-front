import { Button, TextField } from "@mui/material";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { addEmployee } from "../actions/employeesActions";
import { AppDispatch } from "../store";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
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

export default function AddEmployeeForm({ onClose }: { onClose: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(addEmployee(data));
    onClose();
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField {...register("firstName")} label="First Name" />
        <TextField {...register("lastName")} label="Last Name" />
        <TextField type="email" {...register("email")} label="Email" />
        <TextField type="tel" {...register("phone")} label="Phone Number" />
        <TextField {...register("department")} label="Department" />
        <TextField {...register("position")} label="Position" />
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
