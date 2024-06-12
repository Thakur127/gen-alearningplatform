import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axios";

import {
  Box,
  Button,
  Image,
  Flex,
  useDisclosure,
  useToast,
  Card,
  CardBody,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Divider,
  Spinner,
} from "@chakra-ui/react";
import useGetUser from "../../hooks/useGetUser";
import AlertBox from "../../components/AlertBox";
import Testimonial from "../../components/Testimonial";
import { ClosedCaptionOff, Delete, Language } from "@mui/icons-material";
import { useMutation, useQuery } from "react-query";
import getSymbolFromCurrency from "currency-symbol-map";
import useAuth from "../../hooks/useAuth";
import Rating from "../../components/Rating";
import AddReviewBox from "../../components/AddReviewBox";
import moment from "moment/moment";
import useCourseReviews from "../../hooks/useCourseReviews";
import { CheckIcon } from "@heroicons/react/24/outline";

const CourseDetailPage = () => {
  const [course, setCourse] = useState(null);

  const { course_id } = useParams();

  // const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  const toast = useToast();
  const { data: user } = useGetUser();
  const isAuthenticated = useAuth();

  const {} = useQuery({
    queryKey: ["course", course_id],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/course/${course_id}/`);
      return data;
    },
    enabled: !!course_id,
    onSuccess: (data) => {
      setCourse(data?.course);
      setIsEnrolled(data?.enrollment);
    },
  });

  const deleteCourse = async () => {
    try {
      const res = await axiosInstance.delete(`/course/${course_id}`);
      navigate(-1);
    } catch (error) {
      // console.log(error);
      toast({
        title: "An error occured",
        description: error.response.data?.detail,
        duration: 5000,
        position: "bottom-right",
        isClosable: true,
        status: "error",
      });
    } finally {
      onClose();
    }
  };

  const enroll = async () => {
    try {
      const res = await axiosInstance.post(`/course/enroll/`, {
        course: course_id,
      });
      // console.log(res.data);
      setIsEnrolled(true);
    } catch (error) {}
  };

  const buyCourse = useMutation(
    async (course_id) => {
      if (!isAuthenticated) {
        navigate(`/login?redirect_to=/course/${course_id}`);
      }

      const { data } = await axiosInstance.post(
        "/payments/create-checkout-session/",
        {
          course_id,
        }
      );
      return data;
    },
    {
      onSuccess: (data) => {
        // console.log(data);
        window.location.href = data.sessionUrl;
      },
      onError: (error) => {
        // console.log(error);
      },
    }
  );

  const { data: reviews, courseRating } = useCourseReviews(course_id);

  return (
    <>
      {course ? (
        <div className="w-full">
          <div>
            {course?.owner?.email === user?.email && (
              <div className="fixed bottom-12 right-12">
                <Button
                  width={"2rem"}
                  height={"2.5rem"}
                  rounded={"full"}
                  backgroundColor={"red.500"}
                  color={"gray.100"}
                  _hover={{
                    bg: "red.500",
                  }}
                  _active={{
                    bg: "red.600",
                  }}
                  title="Delete Course"
                  onClick={onOpen}
                >
                  <Delete />
                </Button>
                <AlertBox
                  onClose={onClose}
                  isOpen={isOpen}
                  header={"Delete Course"}
                  confirm={deleteCourse}
                  cancelTitle="Cancel"
                  confirmTitle={"Delete"}
                >
                  <p>
                    Are you sure?{" "}
                    <strong>You can't undo this action afterwards.</strong>
                    All your lectures realted to this course will be deleted
                    permanently.
                  </p>
                </AlertBox>
              </div>
            )}
            <div className="container bg-gray-800 px-0 relative ">
              <div className="lg:hidden">
                <Image
                  src={course?.cover_img}
                  className="max-h-96 object-cover w-full"
                />
              </div>
              <div className="max-w-[700px] py-6 lg:py-10 px-4 lg:px-24">
                <h4 className="text-gray-400">{course?.category}</h4>

                <h2 className="text-4xl text-gray-100 ">{course?.title}</h2>
                <p className="text-gray-400 mt-1">{course?.description}</p>

                <Flex alignItems={"center"} marginTop={"1rem"}>
                  <Rating rating={courseRating.rating} />
                  <p className="ml-1 text-sm text-gray-400">
                    ({courseRating.total})
                  </p>
                  <p className="text-gray-100 ml-2">
                    {course?.enrollments.length
                      ? course?.enrollments.length + " " + "students"
                      : ""}{" "}
                  </p>
                </Flex>
                <p className="text-gray-100 text-sm mt-2">
                  <span className="text-gray-400">Created by - </span>
                  <Link
                    to={`/profile/${course?.owner.username}/`}
                    className="hover:underline underline-offset-2"
                  >
                    {course?.owner.first_name} {course?.owner.last_name}
                  </Link>
                </p>
                <div className="text-gray-100 text-sm mt-2 flex gap-4">
                  <span>
                    Last updated -{" "}
                    {moment(new Date(course?.created_at).toUTCString()).format(
                      "ll"
                    )}
                  </span>
                  <div className="flex gap-1">
                    <Language fontSize="small" />
                    {course?.languages}
                  </div>
                  <div className="flex gap-1 ">
                    <ClosedCaptionOff fontSize="small" />
                    {course?.captions
                      ? course?.captions
                      : "No caption available"}
                  </div>
                </div>
                {!isEnrolled ? (
                  <>
                    <div
                      className={`hidden lg:block absolute top-[4rem] right-32 z-10 `}
                    >
                      <Card className="w-[350px] overflow-hidden">
                        <Image
                          src={course?.cover_img}
                          className="max-h-80 object-cover"
                        />
                        {/* <AspectRatio ratio={16 / 9}>
                <ReactPlayer
                  width={"350px"}
                  height={"360"}
                  url={course?.preview_video}
                  light={true}
                  fallback={<Image src={course?.cover_img} />}
                  controls={true}
                />
              </AspectRatio> */}
                        <CardBody>
                          <h3 className="mb-2">
                            <span className="font-semibold text-xl">
                              {getSymbolFromCurrency(course?.currency)}
                              {course?.price}{" "}
                            </span>
                          </h3>
                          <div className="space-y-2">
                            <Button variant={"primary"} width={"full"}>
                              Add to Cart
                            </Button>
                            <Button
                              isLoading={buyCourse.isLoading}
                              colorScheme="green"
                              fontWeight={"regular"}
                              fontSize={"sm"}
                              onClick={() => {
                                course?.price === "0.00"
                                  ? enroll()
                                  : buyCourse.mutate(course?.id);
                              }}
                              className="text-sm w-full rounded p-2 bg-emerald-400 text-zinc-100 hover:bg-emerald-500 transition-colors"
                            >
                              {course?.price === "0.00" ? "Enroll" : "Buy Now"}
                            </Button>
                          </div>
                          <p className="text-center text-sm mt-3">
                            30 day money back gurantee
                          </p>
                          <p className="text-center text-xs mt-1">
                            Full life time access
                          </p>
                          <div className="flex justify-around mt-2 ">
                            <span className="underline underline-offset-2 text-sm cursor-pointer">
                              Gift this course
                            </span>
                            <span className="underline underline-offset-2 text-sm cursor-pointer">
                              Apply coupon
                            </span>
                          </div>
                        </CardBody>
                      </Card>
                    </div>

                    {/* For small screen */}
                    <div className="fixed left-0 shadow-[-5px_0_15px_10px_rgba(0,0,0,0.5)] bg-black container py-4 bottom-0 flex justify-between items-center z-10 lg:hidden">
                      <h4 className="text-gray-100">
                        {getSymbolFromCurrency(course?.currency)}
                        {course?.price}
                      </h4>
                      <Button
                        colorScheme="green"
                        onClick={() => {
                          course?.price === "0.00"
                            ? enroll()
                            : buyCourse.mutate(course_id);
                        }}
                      >
                        {course?.price === "0.00" ? "Enroll" : "Buy Now"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="py-4 lg:px-24 max-w-[700px]">
              <div className="space-y-4 ">
                <div className="container border border-gray-400 p-2 bg-white">
                  <h3 className="text-xl md:text-2xl font-bold">
                    What you'll learn
                  </h3>
                  <div className="font-inter mt-4 grid grid-cols-2 gap-2">
                    {JSON.parse(course?.outcomes).map((item, idx) => {
                      if (item.length == 0) {
                        return <></>;
                      }
                      return (
                        <div key={idx} className="flex items-start">
                          <CheckIcon className="w-8 h-8 text-green-500 font-bold mr-4" />
                          <div className="text-sm ">{item}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className={``}>
                  <h3 className="text-xl md:text-2xl font-bold">Lectures</h3>
                  <Accordion
                    allowMultiple
                    defaultIndex={[0]}
                    allowToggle
                    className="mt-4"
                  >
                    {course?.lectures.map((lecture, idx) => {
                      return (
                        <AccordionItem
                          key={idx}
                          border={"1px solid black"}
                          marginY={"0.5rem"}
                        >
                          <h2>
                            <AccordionButton
                              _expanded={{ bg: "black", color: "gray.100" }}
                            >
                              <AccordionIcon marginRight={"1rem"} />
                              <Flex flexGrow={1}>
                                <Box as="span">{lecture?.title}</Box>
                              </Flex>
                              <Box as="span" fontSize={"sm"}>
                                {lecture?.duration}
                              </Box>
                            </AccordionButton>
                          </h2>
                          <AccordionPanel>
                            <Box className="text-gray-600 mb-2" fontSize={"sm"}>
                              {lecture?.description}
                            </Box>
                            <Link
                              to={`${
                                isEnrolled
                                  ? "/course/" +
                                    course?.id +
                                    "/lecture/" +
                                    lecture?.chapter
                                  : "#"
                              }`}
                              className={`${
                                !isEnrolled
                                  ? "opacity-50 cursor-not-allowed"
                                  : "opacity-100"
                              }`}
                            >
                              <Button variant={"primary"} borderRadius="2px">
                                Watch Video
                              </Button>
                            </Link>
                          </AccordionPanel>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">
                    Prerequisites
                  </h3>
                  <ul className="indent-4">
                    {JSON.parse(course?.prerequisites).map((item, idx) => {
                      return (
                        <div key={idx}>
                          {item.length ? (
                            <li className="list-disc list-inside">{item}</li>
                          ) : (
                            "No Prerequisite needed."
                          )}
                        </div>
                      );
                    })}
                    <h4>
                      {JSON.parse(course?.prerequisites.length === 0) &&
                        "No prerequisites needed."}
                    </h4>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {isEnrolled && (
            <>
              <Divider className="h-[1px] bg-black" />
              <div className="container py-4 lg:px-24 space-y-4">
                <h3 className="text-xl font-semibold">Add Review</h3>
                <AddReviewBox course_id={course_id} />
              </div>
            </>
          )}

          <div className="bg-gray-800 container py-10 lg:px-24 w-full space-y-4">
            <h3 className="text-gray-100 text-xl text-semibold">Reviews</h3>
            <div className="space-y-6 max-h-[140rem] overflow-auto">
              {reviews?.map((review) => {
                return <Testimonial key={review?.id} review={review} />;
              })}
              {reviews?.length === 0 && (
                <p className="text-gray-500">No Reveiws yet</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 h-full flex items-center justify-center">
          <Spinner size={"xl"} />
        </div>
      )}
    </>
  );
};

export default CourseDetailPage;
