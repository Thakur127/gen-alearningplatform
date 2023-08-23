import { Box, Heading } from "@chakra-ui/react";
import React from "react";

const ComponentWrapper = ({ children, heading }) => {
  return (
    <Box>
      <Heading className="text-center">{heading}</Heading>
      <Box className="mt-4">{children}</Box>
    </Box>
  );
};

export default ComponentWrapper;
