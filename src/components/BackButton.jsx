import React from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { Button } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

const BackButton = ({ className, ...rest }) => {
  const navigate = useNavigate();

  return (
    <div className="mb-2">
      <Button
        fontWeight={"medium"}
        fontSize={"sm"}
        variant={"ghost"}
        colorScheme="gray"
        leftIcon={<ChevronLeftIcon className="w-4 h-4" />}
        className={cn(
          "px-4 py-2 rounded-md transition-colors duration-100 cursor-pointer text-zinc-800",
          className
        )}
        onClick={() => {
          navigate(-1);
        }}
        {...rest}
      >
        Back
      </Button>
    </div>
  );
};

export default BackButton;
