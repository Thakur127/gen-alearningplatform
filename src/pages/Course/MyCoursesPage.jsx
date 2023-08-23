import React from "react";
import FeaturedCourse from "../../components/FeaturedCourse";
import useMyCourses from "../../hooks/useMyCourses";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import useGetUser from "../../hooks/useGetUser";
import {
  Button,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

import moment from "moment/moment";

const MyCoursesPage = () => {
  const { data: courses } = useMyCourses();
  const { data: user } = useGetUser();

  const navigate = useNavigate();

  return (
    <div className="container py-4 lg:px-16">
      <div className="w-full flex justify-between items-center">
        <h2>
          Hey, <span className="text-slate-500">{user?.first_name}</span>
        </h2>
        <button
          onClick={() => {
            // navigate to create course page
            navigate("/create-course/");
          }}
          className=" text-slate-100 bg-green-500/90 py-2 px-3 flex items-center justify-center gap-1 text-sm hover:bg-green-600/90 active:bg-green-600 transition-colors"
        >
          <PlusIcon className="w-5 h-5 stroke-slate-100" />
          Add New Course
        </button>
      </div>
      <div>
        <h2 className="text-lg lg:text-xl font-medium lg:font-semibold">
          Your Courses
        </h2>
        <Button variant={"unstyled"} fontWeight={"normal"}>
          <Select size={"sm"}>
            <option defaultChecked value={"NS"}>
              Choose Category
            </option>
            <option value="PH">Physics</option>
            <option value="MA">Mathematics</option>
            <option value="FM">Finance & Marketing</option>
            <option value="EC">Economics</option>
          </Select>
        </Button>
        <div>
          <TableContainer maxWidth={"fit-content"}>
            <Table
              variant={"striped"}
              colorScheme="blackAlpha"
              size={{ base: "sm", md: "md", lg: "lg" }}
            >
              <Thead>
                <Tr>
                  <Th>Price</Th>
                  <Th>Course Title</Th>
                  <Th>Enrollments</Th>
                  <Th>Created at</Th>
                </Tr>
              </Thead>
              <Tbody>
                {courses?.map((course, idx) => {
                  return (
                    <Tr key={idx}>
                      <Td>${course?.price}</Td>
                      <Td>
                        <Link
                          to={`/course/${course?.pk}/`}
                          className="text-blue-500 underline underline-offset-2"
                        >
                          {course?.title}
                        </Link>
                      </Td>
                      <Td>{course?.enrollments.length}</Td>
                      <Td>
                        {moment(
                          new Date(course?.created_at).toUTCString()
                        ).format("ll")}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default MyCoursesPage;
