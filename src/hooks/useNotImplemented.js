import { useToast } from "@chakra-ui/react";

const useNotImplemented = () => {
  const toast = useToast();

  return toast({
    title: "Not Implemented",
    description: "This feature is under development.",
    status: "info",
    position: "bottom-right",
    duration: 9000,
    isClosable: true,
  });
};

export default useNotImplemented;
