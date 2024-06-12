import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import LectureModal from "./LectureModal";
import { useRecoilValue } from "recoil";
import newLecturesState from "../../../atoms/newLecturesState";

const LectureStep = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const newLectures = useRecoilValue(newLecturesState);

  // console.log(newLectures);

  return (
    <Box className="container py-4 lg:px-16">
      <Box className="border p-2 divide-y divide-zinc-200 mb-4">
        {newLectures?.map((lecture, idx) => {
          return (
            <Box key={idx} className="py-2 first:pt-0 last:pb-0">
              <Text>
                Chapter: {idx + 1} - {lecture?.title}
              </Text>
            </Box>
          );
        })}
        {newLectures.length === 0 && (
          <Text className="text-center mb-4">No Lectures</Text>
        )}
      </Box>
      <Button
        colorScheme="green"
        leftIcon={<PlusIcon className="w-6 h-6" />}
        onClick={onOpen}
      >
        Add Lecture
      </Button>
      <LectureModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </Box>
  );
};

export default LectureStep;
