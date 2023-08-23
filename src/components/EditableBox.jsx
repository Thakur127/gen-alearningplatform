import {
  Box,
  IconButton,
  Input,
  InputAddon,
  InputGroup,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";

// import { PencilSquareIcon } from "@heroicons/react/24/outline";

const EditableBox = ({ content }) => {
  const [edit, setEdit] = useState(false);
  const [inputValue, setInputValue] = useState(content);

  const handleEdit = () => {};

  const editableInput = () => {
    return (
      <Box>
        <InputGroup>
          <InputAddon children="u/" className="text-zinc-500" />
          <Input
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            focusBorderColor="zinc-.900"
            className=""
          />
          {/* <IconButton icon={<PencilSquareIcon />} /> */}
        </InputGroup>
        <Box marginTop={2}>
          <Button
            size="sm"
            fontWeight="medium"
            variant="outline"
            marginRight={2}
            colorScheme="green"
            onClick={handleEdit}
          >
            Confirm
          </Button>
          <Button
            size="sm"
            fontWeight="medium"
            variant="outline"
            colorScheme="red"
            onClick={() => {
              setEdit(false);
              setInputValue(content);
            }}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    );
  };

  const displayValue = () => {
    return (
      <Box className="flex w-full flex-grow justify-between items-center">
        <div className="p-2 border rounded-md flex-1">
          <span className="text-zinc-500 mr-2">u/</span>
          {content}
        </div>
        <Button
          fontWeight={"medium"}
          size={"sm"}
          variant={"ghost"}
          colorScheme="blue"
          onClick={() => {
            setEdit(true);
          }}
        >
          Edit
        </Button>
      </Box>
    );
  };

  return (
    <Box>
      {edit ? editableInput() : displayValue()}
      {displayValue()}
    </Box>
  );
};

export default EditableBox;
