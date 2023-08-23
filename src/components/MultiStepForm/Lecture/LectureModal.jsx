import {
  Button,
  ButtonGroup,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import LectureForm from "./LectureForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRecoilState } from "recoil";
import newLecturesState from "../../../atoms/newLecturesState";

const LectureModal = ({ isOpen, onOpen, onClose }) => {
  const [disableBtn, setDisableBtn] = React.useState(true);
  const [newLectures, setNewLectures] = useRecoilState(newLecturesState);

  const addLecture = (values) => {
    setNewLectures((prevData) => {
      return [...prevData, values];
    });
    onClose();
  };

  const formData = useFormik({
    initialValues: {
      title: "",
      description: "",
      lecture_url: "",
      duration: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, "Must be 3 characters or long")
        .max(20, "Must be 20 characters of less")
        .required("Required"),
      lecture_url: Yup.string()
        .url()
        .nonNullable()
        .max(256, "Must be 256 characters of less")
        .required("Required"),
      duration: Yup.string()
        .matches(
          "[0-9]{2}:[0-9]{2}:[0-9]{2}",
          "Duration should be in the format 00:00:00"
        )
        .required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      addLecture(values);
    },
  });

  useEffect(() => {
    if (Object.values(formData.errors).length !== 0) {
      setDisableBtn(true);
    } else {
      setDisableBtn(false);
    }
  }, [formData.errors, formData.touched]);

  useEffect(() => {
    formData.resetForm();
  }, [newLectures]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      motionPreset="slideInBottom"
      size={"xl"}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading className="">Add Lecture</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <LectureForm
            initialData={formData.values}
            handleChange={formData.handleChange}
            errors={formData.errors}
            touched={formData.touched}
          />
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button variant={"ghost"} colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant={"solid"}
              colorScheme="green"
              isDisabled={disableBtn}
              onClick={formData.handleSubmit}
              typeof="submit"
            >
              Add
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LectureModal;
