import React from "react";
import {
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  ModalCloseButton,
  FormHelperText,
} from "@chakra-ui/react";

const EmailBoxModal = ({
  values,
  handleChange,
  handleSubmit,
  errors,
  touched,
  onClose,
  isOpen,
  heading,
  isLoading,
}) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{heading}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel htmlFor="email">Email</FormLabel>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              placeholder="johndoe@gmail.com"
              className="input"
            />
            {errors.email && touched.email && (
              <FormHelperText color={"red.500"}>{errors.email}</FormHelperText>
            )}
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup>
            <Button onClick={onClose}>Close</Button>
            <Button
              isLoading={isLoading}
              colorScheme={"green"}
              onClick={handleSubmit}
            >
              Send
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EmailBoxModal;
