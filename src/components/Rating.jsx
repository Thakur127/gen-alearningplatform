import { Box, Flex } from "@chakra-ui/react";
import { StarIcon } from "@heroicons/react/24/outline";
import React from "react";

const Rating = ({ rating }) => {
  return (
    <Box className="flex items-center gap-1">
      <Box as="span" color={"orange.500"}>
        {rating ? Math.round(rating * 10) / 10 : 0}
      </Box>
      <Flex alignItems={"center"} gap={0.5}>
        {[1, 2, 3, 4, 5].map((val) => {
          return (
            <StarIcon
              key={val}
              className={`w-4 h-4 ${
                val <= Math.round(rating)
                  ? "fill-orange-500 stroke-orange-500"
                  : "fill-orange-500/20 stroke-orange-500/20"
              }`}
            />
          );
        })}
      </Flex>
    </Box>
  );
};

export default Rating;
