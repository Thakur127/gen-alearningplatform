import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import EmailBoxModal from "../EmailBoxModal";
import axiosInstance from "../../api/axios";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

const SendResetPasswordEmail = ({ onClose, isOpen }) => {
  const [isSending, setIsSending] = useState(false);

  const toast = useToast();
  const { values, handleChange, handleSubmit, errors, touched, resetForm } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email address is required"),
      }),
      onSubmit: async (values) => {
        // alert(JSON.stringify(values));
        setIsSending(true);
        try {
          const res = await axiosInstance.post("/auth/password/reset/", values);
          console.log(res.data);
          toast({
            title: "Email Sent.",
            description: res.data.detail,
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        } catch (error) {
          toast({
            title: "Email Sent.",
            description: res.data.error,
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        }
        setIsSending(false);
      },
    });

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <EmailBoxModal
      heading={"Reset Password"}
      onClose={onClose}
      isOpen={isOpen}
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
      touched={touched}
      isLoading={isSending}
    />
  );
};

export default SendResetPasswordEmail;
