import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axios";
import { useState } from "react";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [oldPasswordError, setOldPasswordError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleClose = () => {
    setIsLoading(false);
    setOldPasswordError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              old_password: "",
              new_password1: "",
              new_password2: "",
            }}
            validationSchema={Yup.object({
              old_password: Yup.string().required("Old Password is required"),
              new_password1: Yup.string()
                .min(6, "Password must be 6 characters long atleast.")
                .max(20, "Password can't exceed 20 characters.")
                .required("New Password is Required"),
              // .matches(
              //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
              // ),
              new_password2: Yup.string()
                .oneOf([Yup.ref("new_password1"), null], "Password must match.")
                .required("This Field can't be blank"),
            })}
            onSubmit={async (values, { setErrors, resetForm, setTouched }) => {
              setIsLoading(true);
              console.log("running...");
              try {
                const res = await axiosInstance.post(
                  "/auth/password/change/",
                  values
                );
                console.log(res.data);
                resetForm();
                setOldPasswordError(null);
                toast({
                  title: "Password change successfully.",
                  description: res.data.detail,
                  duration: 5000,
                  isClosable: true,
                  position: "top",
                  status: "success",
                });
              } catch (error) {
                setOldPasswordError(error.response.data?.old_password?.[0]);
              }
              setIsLoading(false);
            }}
          >
            {() => (
              <Form className="space-y-2">
                <FormControl>
                  <Field
                    name="old_password"
                    placeholder="Old Password"
                    className="input"
                    type="password"
                  />
                  <div className="text-red-500 text-xs lg:text-sm">
                    <ErrorMessage name="old_password" />
                    <p>{oldPasswordError}</p>
                  </div>
                </FormControl>
                <FormControl>
                  <Field
                    name="new_password1"
                    placeholder="New Password"
                    className="input"
                    type="password"
                  />
                  <div className="text-red-500 text-xs lg:text-sm">
                    <ErrorMessage name="new_password1" />
                  </div>
                </FormControl>
                <FormControl>
                  <Field
                    name="new_password2"
                    placeholder="Confirm New Password"
                    className="input"
                    type="text"
                  />
                  <div className="text-red-500 text-xs lg:text-sm">
                    <ErrorMessage name="new_password2" />
                  </div>
                </FormControl>
                <Button isLoading={isLoading} variant={"primary"} type="submit">
                  Change password
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;
