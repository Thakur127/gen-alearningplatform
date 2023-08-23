import React from "react";
import useEnrolledCourses from "../../hooks/useEnrolledCourses";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const EnrolledCoursesPage = () => {
  const { data: enrollments } = useEnrolledCourses();
  const navigate = useNavigate();
  return (
    <div className="container py-4 lg:px-16 grid lg:grid-cols-7">
      <section className="lg:col-span-4">
        <Heading>Enrolled Courses</Heading>
        <div className="mt-4">
          {enrollments?.map(({ course }, idx) => {
            return (
              <div key={idx} className="bg-white space-y-2 mb-4 max-w-2xl">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Image
                    src={course?.cover_img}
                    width={{ base: "full", sm: "14rem", md: "18rem" }}
                    objectFit={"cover"}
                  />
                  <div className="w-full flex flex-col flex-1 p-2 sm:p-0">
                    <span className="text-sm font-medium text-gray-500">
                      {course?.category}
                    </span>
                    <div className="flex-1">
                      <Text
                        noOfLines={2}
                        className="text-xl lg:text-2xl hover:underline hover:cursor-pointer"
                      >
                        {course?.title}
                      </Text>
                      <Text noOfLines={3} className="text-slate-500">
                        {course?.description}
                      </Text>
                    </div>

                    <div className="w-full flex justify-between items-center sm:p-2 border-t-[1px] py-2 self-end">
                      {/* <p>Recorded Lectures</p> */}
                      <Button
                        variant={"primary"}
                        onClick={() => {
                          navigate(`/course/${course?.id}/`);
                        }}
                        width={"full"}
                      >
                        View Course
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {enrollments?.length === 0 && (
          <div className="text-center mt-10">
            <p>Not Enrolled in any courses</p>
            <Link to="/">
              <Button variant={"primary"} marginTop={2}>
                Explore Courses
              </Button>
            </Link>
          </div>
        )}
      </section>
      <section className="hidden lg:block h-screen w-[2px] bg-gray-500 place-self-center" />
      <section className="hidden lg:block mt-4 lg:col-span-2">
        <Heading size={"md"} className="text-center">
          Recommended Course
        </Heading>
      </section>
    </div>
  );
};

export default EnrolledCoursesPage;
