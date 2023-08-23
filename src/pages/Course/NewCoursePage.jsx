import React, { useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

// forms and form handling
import useMultiStepForm from "../../hooks/useMultiStepForm";
import LectureStep from "../../components/MultiStepForm/Lecture/LectureStep";
import CourseStep from "../../components/MultiStepForm/Course/CourseStep";
import LastStep from "../../components/MultiStepForm/LastStep";

import { useRecoilValue, useResetRecoilState } from "recoil";
import newLecturesState from "../../atoms/newLecturesState";
import newCourseFormState from "../../atoms/newCourseFormState";

// api
import createCourse from "../../api/createCourse";
import addLecture from "../../api/addLecture";
import uploadImage from "../../lib/uploadImage";

import ComponentWrapper from "../../components/ComponentWrapper";

const NewCoursePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const array = [
    <ComponentWrapper heading={"New Course"}>
      <CourseStep />
    </ComponentWrapper>,

    <ComponentWrapper heading={"Add Lectures"}>
      <LectureStep />
    </ComponentWrapper>,

    <ComponentWrapper heading={"Course Preview"}>
      <LastStep />
    </ComponentWrapper>,
  ];

  const { current, currentIndex, lastIndex, next, prev } =
    useMultiStepForm(array);
  const [readyToPublish, setReadyToPublish] = useState(false);
  const newLectures = useRecoilValue(newLecturesState);
  const newCourse = useRecoilValue(newCourseFormState);
  const navigate = useNavigate();

  const resetState = useResetRecoilState;

  useEffect(() => {
    setReadyToPublish(() => {
      return (
        newLectures.length > 0 &&
        newCourse.title !== "" &&
        newCourse?.description !== "" &&
        newCourse?.price !== "" &&
        newCourse?.category !== "" &&
        newCourse?.currency !== "" &&
        JSON.stringify(newCourse.outcomes).length > 0 &&
        newCourse.cover_img !== "" &&
        newCourse.languages !== ""
      );
    });
  }, [newCourse, newLectures]);

  const publishCourse = async () => {
    setIsLoading(true);
    try {
      let courseData = { ...newCourse };
      if (newCourse?.cover_img instanceof File) {
        const image = await uploadImage(newCourse?.cover_img);
        courseData.cover_img = image.data.secure_url;
      }
      var course = await createCourse(courseData);

      for (let i = 0; i < newLectures.length; i++) {
        const res = await addLecture(course.data?.id, {
          ...newLectures[i],
          chapter: i + 1,
        });
      }

      navigate(`/course/${course.data?.id}/`, { replace: true });
      resetState(newCourseFormState);
      resetState(newLecturesState);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  return (
    <Box className="relative">
      <span className="absolute top-4 right-16">
        {currentIndex + 1} / {lastIndex + 1}
      </span>
      <Box className="mt-4">{current}</Box>
      <Flex justifyContent={"end"} className="container lg:px-16">
        <ButtonGroup className="my-4">
          {currentIndex !== 0 && (
            <Button colorScheme="blue" onClick={prev}>
              Prev
            </Button>
          )}
          {currentIndex < lastIndex ? (
            <Button colorScheme="blue" onClick={next}>
              Next
            </Button>
          ) : (
            <Button
              isDisabled={!readyToPublish}
              colorScheme="green"
              onClick={publishCourse}
              isLoading={isLoading}
            >
              Publish
            </Button>
          )}
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default NewCoursePage;
