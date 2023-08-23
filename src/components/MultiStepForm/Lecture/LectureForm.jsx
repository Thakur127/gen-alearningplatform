import React from "react";
import {
  FormControl,
  Input,
  Box,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import AutoResizeTextarea from "../../AutoResizeTextarea";

const LectureForm = ({ values, handleChange, errors, touched }) => {
  return (
    <form>
      <FormControl isRequired>
        <Box className="mb-3">
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            focusBorderColor="zinc.900"
            type="text"
            fontSize={"sm"}
            value={values?.title}
            onChange={handleChange}
          />
          {errors.title && touched.title ? (
            <FormHelperText color="red.500">{errors.title}</FormHelperText>
          ) : (
            <FormHelperText>Name/title of the course</FormHelperText>
          )}
        </Box>
      </FormControl>
      <FormControl isRequired>
        <Box className="mb-3">
          <FormLabel htmlFor="description">Description</FormLabel>
          <AutoResizeTextarea
            id="description"
            type="text"
            value={values?.description}
            onChange={handleChange}
          />
          {errors.description && touched.description ? (
            <FormHelperText color="red">{errors.description}</FormHelperText>
          ) : (
            <FormHelperText>
              A short description about the lecture.
            </FormHelperText>
          )}
        </Box>
      </FormControl>
      <FormControl isRequired>
        <Box className="mb-3">
          <FormLabel htmlFor="lecture_url">Video Url</FormLabel>
          <Input
            id="lecture_url"
            type="url"
            value={values?.lecture_url}
            onChange={handleChange}
            focusBorderColor="zinc.900"
            placeholder="https://domain.com/video-url/"
            fontSize={"sm"}
          />
          {errors.lecture_url && touched.lecture_url ? (
            <FormHelperText color="red">{errors.lecture_url}</FormHelperText>
          ) : (
            <FormHelperText>A video url/link of the lecture</FormHelperText>
          )}
        </Box>
      </FormControl>
      <FormControl isRequired>
        <Box className="mb-3">
          <FormLabel htmlFor="duration">Duration</FormLabel>
          <Input
            id="duration"
            value={values?.duration}
            onChange={handleChange}
            focusBorderColor="zinc.900"
            placeholder="02:34:44"
            fontSize={"sm"}
            pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
          />
          {errors.duration && touched.duration ? (
            <FormHelperText color="red">{errors.duration}</FormHelperText>
          ) : (
            <FormHelperText>Duration of the video</FormHelperText>
          )}
        </Box>
      </FormControl>
    </form>
  );
};

export default LectureForm;
