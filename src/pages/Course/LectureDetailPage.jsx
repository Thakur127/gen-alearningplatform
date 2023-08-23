import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";
import {
  AspectRatio,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Skeleton,
  Stack,
  StackDivider,
  Text,
  useToast,
} from "@chakra-ui/react";
import BackButton from "../../components/BackButton";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Comment from "../../components/Comment";
import ReactPlayer from "react-player";

const LectureDetailPage = () => {
  const [lecture, setLecture] = useState(null);
  const [nextLecture, setNextLecture] = useState(false);
  const [prevLecture, setPrevLecture] = useState(false);

  let { course_id, lecture_id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  course_id = parseInt(course_id);
  lecture_id = parseInt(lecture_id);

  const uri = `/course/${course_id}/lecture/${lecture_id}/`;
  const next_uri = `/course/${course_id}/lecture/${lecture_id + 1}/`;
  const prev_uri = `/course/${course_id}/lecture/${lecture_id - 1}/`;

  useEffect(() => {
    const getLecture = async () => {
      try {
        const res = await axiosInstance.get(uri);
        // console.log(res.data);
        setLecture(res.data);

        const nextLec = await axiosInstance.get(next_uri);
        const prevLec = await axiosInstance.get(prev_uri);

        setNextLecture(nextLec.data?.chapter);
        setPrevLecture(prevLec.data?.chapter);
      } catch (error) {
        if (error?.response.status === 403) {
          navigate(`/course/${course_id}/`, { replace: true });
          toast({
            title: "Access denied.",
            description: "You need to enroll the course.",
            duration: 5000,
            position: "bottom-right",
            status: "error",
            isClosable: true,
          });
        }
      }
    };

    getLecture();
  }, [course_id, lecture_id]);

  return (
    <Container className="p-4">
      <BackButton />
      {lecture?.chapter ? (
        <Box className="">
          <Text className="text-xl lg:text-2xl my-3">
            Chapter - {lecture?.chapter}: {lecture?.title}
          </Text>
          <AspectRatio ratio={16 / 9}>
            <ReactPlayer
              width={"640"}
              height={"360"}
              url={lecture?.lecture_url}
              light={false}
              controls={true}
            />
          </AspectRatio>

          <Flex
            alignItems={"center"}
            justifyContent={"space-between"}
            className="my-4"
          >
            <Button
              fontWeight={"medium"}
              fontSize={"sm"}
              leftIcon={<ChevronLeftIcon className="w-4 h-4" />}
              isDisabled={!prevLecture}
              onClick={() => {
                navigate(prev_uri);
              }}
            >
              Prev
            </Button>
            <Button
              fontWeight={"medium"}
              fontSize={"sm"}
              rightIcon={<ChevronRightIcon className="w-4 h-4" />}
              isDisabled={!nextLecture}
              onClick={() => {
                navigate(next_uri);
              }}
            >
              Next
            </Button>
          </Flex>
          <Box className="space-y-2">
            <Heading
              as="h3"
              fontWeight={"medium"}
              className="!font-inter !text-lg"
            >
              Discussion
            </Heading>
            <Comment />
          </Box>
        </Box>
      ) : (
        <Stack spacing={4}>
          <Skeleton className="h-12" />
          <Skeleton className="h-56 lg:h-80" />
          <Skeleton className="h-12" />
          <StackDivider />
          <Stack>
            <Skeleton className="h-24" />
          </Stack>
        </Stack>
      )}
    </Container>
  );
};

export default LectureDetailPage;
