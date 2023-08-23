import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Feedback from "./Feedback";

const Comment = () => {
  const [inputValue, setInputValue] = useState("");

  return (
    <Container className="space-y-2">
      <FormControl className="space-y-2">
        <Textarea
          type="text"
          placeholder="Discuss your point..."
          focusBorderColor="zinc.900"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          className="!text-sm !text-zinc-800"
        />
        <Button
          fontWeight={"medium"}
          fontSize={"sm"}
          colorScheme="blue"
          variant={"solid"}
        >
          Submit
        </Button>
      </FormControl>
      <Divider />
      <Box className="h-[36rem] overflow-y-scroll space-y-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, idx) => {
          return (
            <Box key={idx}>
              <Feedback />
            </Box>
          );
        })}
      </Box>
    </Container>
  );
};

export default Comment;
