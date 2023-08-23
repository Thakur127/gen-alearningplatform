import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/outline";
import { AccountCircleRounded } from "@mui/icons-material";
import getSymbolFromCurrency from "currency-symbol-map";

import useGetUser from "../hooks/useGetUser";
import Rating from "./Rating";
import useCourseReviews from "../hooks/useCourseReviews";

const FeaturedCourse = ({ course }) => {
  const { courseRating } = useCourseReviews(course?.id);
  const navigate = useNavigate();

  const user = useGetUser();
  return (
    <Card
      cursor={"pointer"}
      _hover={{ shadow: "lg" }}
      overflow={"hidden"}
      borderRadius={"0"}
    >
      <Box className="relative">
        <Image
          src={course?.cover_img}
          objectFit={"cover"}
          width={{ lg: "full" }}
          height={{ lg: "14rem" }}
        />
        <CardBody>
          <Box
            as="p"
            fontSize={"sm"}
            marginTop={"0.5rem"}
            fontWeight={"medium"}
          >
            {course.category}
          </Box>
          <Text as={"h1"} noOfLines={1} fontSize={{ base: "xl", lg: "2xl" }}>
            {course?.title}
          </Text>
          <Text as={"p"} noOfLines={2} fontSize={"sm"} color={"grey"}>
            {course?.description}
          </Text>

          <Flex fontSize={"xs"} alignItems={"center"} marginY={"0.3rem"}>
            <AccountCircleRounded
              fontSize="small"
              className="text-zinc-500 mr-1"
            />
            {course?.owner?.first_name} {course?.owner?.last_name}
          </Flex>
          <Box className="flex gap-1 items-center">
            <Rating rating={courseRating.rating} />
            <span className="text-xs text-slate-500">
              ({courseRating.total})
            </span>
          </Box>
        </CardBody>
        <Link
          to={`/course/${course?.id}/`}
          className="absolute w-full h-full top-0 left-0"
        ></Link>
      </Box>

      <Divider />
      <CardFooter
        className="flex justify-between items-center"
        paddingY={"0.7rem"}
      >
        <Text as="span">
          {getSymbolFromCurrency(course?.currency)}
          {course?.price}
        </Text>
        <Button
          variant={"primary"}
          onClick={() => {
            navigate(`/course/${course?.id}/`);
          }}
        >
          View Course
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeaturedCourse;
