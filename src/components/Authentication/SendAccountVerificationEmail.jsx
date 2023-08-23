import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import EmailBoxModal from "../EmailBoxModal";
import axiosInstance from "../../api/axios";
import { useToast } from "@chakra-ui/react";

const SendAccountVerificationEmail = ({ onClose, isOpen }) => {
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
        setIsSending(true);
        try {
          const { data } = await axiosInstance.post(
            "/auth/registration/resend-email/",
            values
          );
          console.log(data);
          toast({
            title: "Email Sent.",
            description: "Verification Email Sent.",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        } catch (error) {}
        setIsSending(false);
      },
    });

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  return (
    <EmailBoxModal
      onClose={onClose}
      isOpen={isOpen}
      values={values}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      errors={errors}
      touched={touched}
      heading={"Account Verification"}
      isLoading={isSending}
    />
  );
};

export default SendAccountVerificationEmail;
