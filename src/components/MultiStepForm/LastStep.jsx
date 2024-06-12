import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import newCourseFormState from "../../atoms/newCourseFormState";
import {
  Box,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  Accordion,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  AccordionItem,
  Flex,
  Card,
  CardBody,
  Button,
} from "@chakra-ui/react";
import {
  ClosedCaptionOff,
  Delete,
  FileUploadOutlined,
  Language,
} from "@mui/icons-material";
import { CheckIcon, StarIcon } from "@heroicons/react/24/outline";
import useGetUser from "../../hooks/useGetUser";
import newLecturesState from "../../atoms/newLecturesState";
import getSymbolFromCurrency from "currency-symbol-map";

const LastStep = () => {
  const [courseData, setCourseData] = useRecoilState(newCourseFormState);
  const lectures = useRecoilValue(newLecturesState);
  const preview = React.useRef(null);

  const { data: user } = useGetUser();

  useEffect(() => {
    if (courseData?.cover_img instanceof String) {
      preview.current.src = courseData?.cover_img;
    } else if (courseData?.cover_img instanceof File) {
      preview.current.src = URL.createObjectURL(courseData?.cover_img);
    }
  }, [courseData]);

  const handleFileUpload = (e) => {
    setCourseData((prevData) => {
      return {
        ...prevData,
        cover_img: e.target.files[0],
      };
    });
    try {
      preview.current.src = URL.createObjectURL(courseData?.cover_img);
    } catch (error) {
      preview.current.src = courseData?.cover_img;
    }
  };

  return (
    <div className="">
      <div>
        <div className="w-full">
          <div>
            {
              <div className="fixed bottom-12 right-12 z-10">
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
                >
                  <Delete />
                </Button>
              </div>
            }
            <div className="container bg-gray-800 px-0 relative ">
              <div className="lg:hidden">
                <FormControl className="w-full">
                  <FormLabel
                    htmlFor="cover_img"
                    className="w-full h-fit group relative cursor-pointer"
                  >
                    <Box
                      className={`absolute w-full h-full bg-zinc-400/30 flex justify-center items-center opacity-0 group-hover:opacity-90 transition-opacity duration-300 ease-in-out`}
                    >
                      <FileUploadOutlined fontSize="large" className="" />
                      <br />
                      <Text className="text-sm lg:text-base">
                        Upload Cover Image
                      </Text>
                    </Box>
                    <Image
                      ref={preview}
                      alt=""
                      className={`object-cover w-full h-60 `}
                    />
                  </FormLabel>
                  <Text className="text-sm text-center text-zinc-700">
                    {courseData?.cover_img?.name}
                  </Text>
                  <Input
                    type="file"
                    id="cover_img"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </FormControl>
              </div>
              <div className="max-w-[700px] py-6 lg:py-10 px-4 lg:px-24">
                <h4 className="text-gray-400">{courseData?.category}</h4>

                <h2 className="text-4xl text-gray-100 ">{courseData?.title}</h2>
                <p className="text-gray-400 mt-1">{courseData?.description}</p>

                <Flex alignItems={"center"} marginTop={"1rem"}>
                  <p className="text-orange-600 mr-2">4.0</p>
                  <Flex>
                    <StarIcon className="w-4 h-4 stroke-orange-500 fill-orange-500" />
                    <StarIcon className="w-4 h-4 stroke-orange-500 fill-orange-500" />
                    <StarIcon className="w-4 h-4 stroke-orange-500 fill-orange-500" />
                    <StarIcon className="w-4 h-4 stroke-orange-500 fill-orange-500" />
                    <StarIcon className="w-4 h-4 stroke-orange-500/40 fill-orange-500/40" />
                  </Flex>
                  <p className="ml-1 text-sm text-gray-400">(23,034)</p>
                  <p className="text-gray-100 ml-2">23,132 students</p>
                </Flex>
                <p className="text-gray-100 text-sm mt-2">
                  <span className="text-gray-400">Created by - </span>
                  <Link
                    to={`/profile/${user.username}`}
                    className="hover:underline underline-offset-2"
                  >
                    {user.first_name} {user.last_name}
                  </Link>
                </p>
                <div className="text-gray-100 text-sm mt-2 flex gap-4">
                  <span>
                    Last updated {new Date().getMonth}
                    {"/"}
                    {new Date().getFullYear()}
                  </span>
                  <div className="flex gap-1">
                    <Language fontSize="small" />
                    {courseData?.languages
                      ? courseData?.languages
                      : "Not specified"}
                  </div>
                  <div className="flex gap-1 ">
                    <ClosedCaptionOff fontSize="small" />
                    {courseData?.captions
                      ? courseData?.captions
                      : "No Caption available"}
                  </div>
                </div>
              </div>

              <div
                className={`hidden lg:block fixed top-[6rem] right-24 z-10 `}
              >
                <Card className="w-[350px] overflow-hidden">
                  <FormControl className="">
                    <FormLabel
                      htmlFor="cover_img"
                      className="w-full h-fit group relative cursor-pointer"
                    >
                      <Box
                        className={`w-full h-full bg-zinc-400/30 absolute flex justify-center items-center opacity-0 group-hover:opacity-90 transition-opacity duration-300 ease-in-out`}
                      >
                        <FileUploadOutlined fontSize="large" className="" />
                        <br />
                        <Text className="text-sm lg:text-base">
                          Upload Cover Image
                        </Text>
                      </Box>
                      <Image
                        ref={preview}
                        alt=""
                        className={`object-cover w-full h-52 `}
                      />
                    </FormLabel>
                    <Text className="text-sm text-center text-zinc-700">
                      {courseData?.cover_img?.name}
                    </Text>
                    <Input
                      type="file"
                      id="cover_img"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </FormControl>
                  <CardBody>
                    <h3 className="mb-2 font-semibold text-xl">
                      {getSymbolFromCurrency(courseData?.currency)}
                      {courseData?.price}
                    </h3>
                    <div className="space-y-2">
                      <Button variant={"primary"} width={"full"}>
                        Add to Cart
                      </Button>
                      <button className="text-sm w-full rounded p-2 bg-emerald-400 text-zinc-100 hover:bg-emerald-500 transition-colors">
                        Buy Now
                      </button>
                    </div>
                    <p className="text-center text-sm mt-3">
                      30 day money back gurantee
                    </p>
                    <p className="text-center text-xs mt-1">
                      Full life time access
                    </p>
                    <div className="flex justify-around mt-2 ">
                      <span className="underline underline-offset-2 text-sm cursor-pointer">
                        Gift this courseData
                      </span>
                      <span className="underline underline-offset-2 text-sm cursor-pointer">
                        Apply coupon
                      </span>
                    </div>
                  </CardBody>
                </Card>
              </div>
              <div className="lg:hidden bg-black fixed bottom-0 w-full container py-4 flex justify-between items-center">
                <h3 className="font-semibold text-gray-100 text-xl">
                  {getSymbolFromCurrency(courseData?.currency)}{" "}
                  {courseData?.price}
                </h3>
                <Button colorScheme="green">Buy Course</Button>
              </div>
            </div>
            <div className="p-4 lg:px-24 max-w-[700px]">
              <div className="space-y-4">
                <div className="border border-gray-400 p-2 bg-white">
                  <h3 className="text-xl font-semibold">What you'll learn</h3>
                  <div className="font-inter mt-4 grid grid-cols-2 gap-2">
                    {JSON.parse(courseData?.outcomes).map((item, idx) => {
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
                <div className="">
                  <h3 className="text-xl font-semibold">Lectures</h3>
                  <Accordion
                    allowMultiple
                    defaultIndex={[0]}
                    allowToggle
                    className="mt-4"
                  >
                    {lectures.map((lecture, idx) => {
                      return (
                        <AccordionItem
                          key={idx}
                          border={"1px solid black"}
                          marginY={"0.5rem"}
                        >
                          <h2>
                            <AccordionButton
                              _expanded={{
                                bg: "gray.500",
                                color: "gray.100",
                              }}
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
                            <Link to="#" className="">
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
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Prerequisites</h3>
                  <ul className="indent-4">
                    {JSON.parse(courseData?.prerequisites).map((item, idx) => {
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
                      {JSON.parse(courseData?.prerequisites.length === 0) &&
                        "No prerequisites needed."}
                    </h4>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastStep;
