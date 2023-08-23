import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  useToast,
  position,
} from "@chakra-ui/react";
import * as Yup from "yup";

import axiosInstance from "../../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ role }) => {
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  console.log(role);

  return (
    <Formik
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password1: "",
        password2: "",
        role: role,
      }}
      validationSchema={Yup.object({
        first_name: Yup.string()
          .min(1, "First Name can't be blank")
          .required("First Name is required"),
        last_name: Yup.string().max(
          64,
          "This field can't exceed 64 characters"
        ),
        email: Yup.string()
          .email("Invalid email address.")
          .required("Email is required."),
        password1: Yup.string()
          .min(6, "Password must be 6 characters long atleast.")
          .max(20, "Password can't exceed 20 characters.")
          .required("Password is Required"),
        // .matches(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        // ),
        password2: Yup.string()
          .oneOf([Yup.ref("password1"), null], "Password must match.")
          .required("This Field can't be blank"),
      })}
      onSubmit={async (values, { resetForm }) => {
        // alert("submitted");
        setIsCreating(true);
        try {
          const res = await axiosInstance.post("/auth/registration/", values);
          console.log(res.data);
          setIsCreating(false);
          resetForm();
          toast({
            title: "Account Created",
            description: res.data.detail,
            status: "success",
            duration: 9000,
            position: "top",
          });
          navigate("/login");
        } catch (error) {
          setIsCreating(false);
        }
      }}
    >
      {() => (
        <Form>
          <FormControl marginBottom="0.6rem" isRequired={true}>
            <FormLabel htmlFor="first_name">First Name</FormLabel>
            <Field
              id="first_name"
              name="first_name"
              type="text"
              className="input"
              placeholder="First Name"
            />
            <div className="text-red-500 text-sm">
              <ErrorMessage name="first_name" />
            </div>
          </FormControl>
          <FormControl marginBottom="0.6rem">
            <FormLabel htmlFor="last_name">Last Name</FormLabel>
            <Field
              id="last_name"
              name="last_name"
              type="text"
              className="input"
              placeholder="Last Name"
            />
            <div className="text-red-500 text-sm">
              <ErrorMessage name="last_name" />
            </div>
          </FormControl>
          <FormControl marginBottom="0.6rem" isRequired={true}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Field
              id="email"
              name="email"
              type="email"
              className="input"
              placeholder="Email"
            />
            <div className="text-red-500 text-sm">
              <ErrorMessage name="email" />
            </div>
          </FormControl>
          <FormControl marginBottom="0.6rem" isRequired={true}>
            <FormLabel htmlFor="password1">Password</FormLabel>
            <Field
              id="password1"
              name="password1"
              type="password"
              className="input"
              placeholder="Password"
            />
            <div className="text-red-500 text-sm">
              <ErrorMessage name="password1" />
            </div>
          </FormControl>
          <FormControl marginBottom="0.6rem" isRequired={true}>
            <FormLabel htmlFor="password2">Confirm Password</FormLabel>
            <Field
              id="password2"
              name="password2"
              type="password"
              className="input"
              placeholder="Confirm Password"
            />
            <div className="text-red-500 text-sm">
              <ErrorMessage name="password2" />
            </div>
          </FormControl>
          <FormControl marginBottom="0.6rem">
            <Button
              type="submit"
              variant="primary"
              width="100%"
              className="!rounded-md"
              isLoading={isCreating}
            >
              Create Account
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
