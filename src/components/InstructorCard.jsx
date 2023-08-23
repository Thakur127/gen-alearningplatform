import React from "react";
import {
  Avatar,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Text,
} from "@chakra-ui/react";
import { StarIcon } from "@heroicons/react/24/outline";
import { cn } from "../lib/utils";

const InstructorCard = ({ instructor, className }) => {
  return (
    <Card borderRadius={0} className={cn("", className)}>
      <CardHeader className="space-y-2">
        <Avatar
          src={instructor?.image_url}
          name={`${instructor?.first_name}, ${instructor?.last_name}`}
          className="!w-32 !h-32"
        />
        <Text noOfLines={2} className="text-center">
          {instructor?.first_name} {instructor?.last_name}
        </Text>
      </CardHeader>
      <CardFooter
        className="text-center flex items-center justify-center gap-1"
        paddingBottom={3}
      >
        <Text className="text-base text-orange-600">4.0</Text>
        <Flex alignItems={"center"}>
          <StarIcon className="w-4 h-4 stroke-orange-500 fill-orange-500" />
          <StarIcon className="w-4 h-4 stroke-orange-500 fill-orange-500" />
          <StarIcon className="w-4 h-4 stroke-orange-500 fill-orange-500" />
          <StarIcon className="w-4 h-4 stroke-orange-500 fill-orange-500" />
          <StarIcon className="w-4 h-4 stroke-orange-500 fill-orange-500" />
        </Flex>
        <Box as={"span"} fontSize={"xs"} color={"gray"}>
          (23,234)
        </Box>
      </CardFooter>
    </Card>
  );
};

export default InstructorCard;
