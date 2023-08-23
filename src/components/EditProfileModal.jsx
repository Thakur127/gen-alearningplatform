import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import axiosInstance from "../api/axios";
import { useQuery } from "react-query";

const EditProfileModal = ({ onClose, isOpen, user }) => {
  const { refetch } = useQuery({
    queryKey: ["currentUser"],
  });

  const toast = useToast();

  const handleSubmit = async (values, field) => {
    try {
      const res = await axiosInstance.patch(
        `auth/user/${user?.username}/`,
        values
      );
      refetch();
      toast({
        title: "Profile updated.",
        description: field + " " + "updated successfully.",
        duration: 5000,
        isClosable: true,
        status: "success",
        position: "top",
      });
    } catch (error) {}
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} size={{ base: "xl", md: "2xl" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="space-y-4">
          <Formik
            initialValues={{
              username: user?.username,
            }}
            onSubmit={(values) => {
              handleSubmit(values, "username");
            }}
          >
            {() => (
              <Form className="space-y-1 lg:space-y-2">
                <FormControl>
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Field name="username" id="username" className="input" />
                </FormControl>
                <Button
                  variant={"primary"}
                  fontSize={{ base: "xs", lg: "sm" }}
                  size={"sm"}
                >
                  Change
                </Button>
              </Form>
            )}
          </Formik>
          <Formik
            initialValues={{
              bio: user?.bio,
            }}
            onSubmit={(values) => {
              handleSubmit(values, "bio");
            }}
          >
            {() => (
              <Form className="space-y-1 lg:space-y-2">
                <FormControl>
                  <FormLabel htmlFor="bio">Bio</FormLabel>
                  <Field name="bio" id="bio" className="input" />
                </FormControl>
                <Button
                  variant={"primary"}
                  fontSize={{ base: "xs", lg: "sm" }}
                  size={"sm"}
                  type=""
                >
                  Change
                </Button>
              </Form>
            )}
          </Formik>
          <Formik
            initialValues={{
              qualifications: user?.qualifications,
            }}
            onSubmit={(values) => {
              handleSubmit(values, "qualifications");
            }}
          >
            {() => (
              <Form className="space-y-1 lg:space-y-2">
                <FormControl>
                  <FormLabel htmlFor="qualifications">Qualifications</FormLabel>
                  <Field
                    name="qualifications"
                    id="qualifications"
                    className="input"
                  />
                  <FormHelperText>
                    use comma(,), if multiple e.g., B.S. Mathematics, M.S
                    Mathematics, etc...
                  </FormHelperText>
                </FormControl>
                <Button
                  variant={"primary"}
                  fontSize={{ base: "xs", lg: "sm" }}
                  size={"sm"}
                  type="submit"
                >
                  Change
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
