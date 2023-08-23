import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

const AlertBox = ({
  onClose,
  isOpen,
  confirm,
  isLoading,
  header,
  body,
  confirmTitle,
  cancelTitle = "Cancel",
  ...rest
}) => {
  const cancelRef = React.useRef();

  return (
    <AlertDialog
      motionPreset="slideInBottom"
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
      {...rest}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody fontSize={"sm"}>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} fontSize={"sm"}>
              {cancelTitle}
            </Button>
            <Button
              fontSize={"sm"}
              isLoading={isLoading}
              colorScheme="red"
              onClick={confirm}
              ml={3}
            >
              {confirmTitle}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default AlertBox;
