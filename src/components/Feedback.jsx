import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const Feedback = () => {
  return (
    <Box>
      <Flex gap={2} className="border p-2 rounded-md shadow">
        <Avatar size={"sm"} />
        <Flex flexDirection={"column"} justifyContent={"center"} gap={2}>
          <Text className="text-sm">
            <span className="text-zinc-400 mr-[3px]">@</span>username
          </Text>
          <Text className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            debitis tempora exercitationem officia a provident, ipsum ad
            molestiae maxime voluptas facere, temporibus nam atque adipisci,
            iste perferendis! Facilis dignissimos eum minima dicta cumque facere
            fugiat!
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Feedback;
