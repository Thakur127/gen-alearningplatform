import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Lecture = ({ lecture }) => {
  return (
    <Flex
      gap={3}
      className="relative border shadow-md hover:-translate-y-1 transition-transform duration-200"
    >
      <Link
        to={`lecture/${lecture?.chapter}/`}
        className="absolute w-full h-full top-0 left-0"
      ></Link>
      <Image src={lecture?.cover_img} className="w-44 h-24" />
      <Box className="py-1">
        <Text className="text-lg">Chapter: {lecture?.chapter}</Text>
        <Text className="text-[14px] lg:text-base text-teal-500">
          {lecture?.title}
        </Text>
        <Text noOfLines={3} className="text-sm text-zinc-500">
          {lecture?.description}
        </Text>
      </Box>
    </Flex>
  );
};

export default Lecture;
