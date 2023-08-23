import { Button, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import { Formik, Form, ErrorMessage, Field, replace } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import axiosInstance from "../../api/axios";
import { useState } from "react";

const ResetPassword = () => {
  const [isReseting, setIsReseting] = useState(false);

  const { uid, token } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  return (
    <div className="py-4 flex-1">
      <div className="container h-full flex justify-center items-center">
        <div className="w-[350px] border p-4 rounded-md shadow-lg">
          <h4 className="text-2xl text-center font-semibold mb-4">
            Reset Password
          </h4>
          <Formik
            initialValues={{
              new_password1: "",
              new_password2: "",
            }}
            validationSchema={Yup.object({
              new_password1: Yup.string()
                .min(6, "Password must be 6 characters long at least.")
                .max(20, "Password can't exceed 20 characters.")
                .required("Password is Required"),
              new_password2: Yup.string()
                .oneOf([Yup.ref("new_password1"), null], "Password must match.")
                .required("This Field can't be blank"),
            })}
            onSubmit={async (values) => {
              // Handle form submission here
              setIsReseting(true);
              try {
                const { data } = await axiosInstance.post(
                  "/auth/password/reset/confirm/",
                  {
                    ...values,
                    uid,
                    token,
                  }
                );
                console.log(data);
                navigate("/login", { replace: true });
                toast({
                  title: "Password Reset Successfull.",
                  description: data.detail,
                  status: "success",
                  duration: 5000,
                  position: "top",
                });
              } catch (error) {
                console.log(error);
              }
              setIsReseting(false);
            }}
          >
            {() => (
              <Form className="space-y-2">
                <FormControl isRequired>
                  <FormLabel htmlFor="new_password1"> New Password</FormLabel>
                  <Field
                    name="new_password1"
                    id="new_password1"
                    type="password"
                    className="input"
                  />
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="new_password1" />
                  </div>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel htmlFor="new_password2">
                    Confirm New Password
                  </FormLabel>
                  <Field
                    name="new_password2"
                    id="new_password2"
                    type="password"
                    className="input"
                  />
                  <div className="text-red-500 text-sm">
                    <ErrorMessage name="new_password2" />
                  </div>
                </FormControl>
                <FormControl>
                  <Button
                    isLoading={isReseting}
                    type="submit"
                    colorScheme="green"
                  >
                    Change
                  </Button>
                </FormControl>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
