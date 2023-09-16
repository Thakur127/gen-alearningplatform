import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axios";
import FeaturedCourse from "../components/FeaturedCourse";
import { Button, Divider, Select, Spinner } from "@chakra-ui/react";
import InstructorCard from "../components/InstructorCard";
import { useQuery, useInfiniteQuery, useQueryClient } from "react-query";
import Footer from "../components/Footer";

const HomePage = () => {
  const [category, setCategory] = useState("");

  const {
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
    data: popularCourse,
  } = useInfiniteQuery({
    queryKey: ["popular-courses", { category: category }],
    queryFn: async ({ pageParam }) => {
      const uri = `/courses/?${pageParam ? "cursor=" + pageParam : ""}${
        category ? "&category=" + category : ""
      }`;
      const { data } = await axiosInstance.get(uri);
      return data;
    },
    getNextPageParam: (lastPage, _pages) => {
      if (lastPage.next) {
        const urlObject = new URL(lastPage.next);
        const cursor = urlObject.searchParams.get("cursor");
        return cursor;
      }
      return null;
    },
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="container py-4 lg:px-16 space-y-4 flex-1">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg lg:text-2xl font-semibold">
              Popular Course
            </h2>
          </div>
          <Button variant={"unstyled"} fontWeight={"normal"}>
            <Select
              size={"sm"}
              value={category}
              placeholder="Choose Category"
              onChange={(e) => {
                setCategory(e.target.value);
                refetch();
              }}
            >
              <option value="PH">Physics</option>
              <option value="MA">Mathematics</option>
              <option value="FM">Finance & Marketing</option>
              <option value="EC">Economics</option>
              <option value="CS">Computer Science</option>
            </Select>
          </Button>
          {isLoading ? (
            <div className="w-full h-44 lg:h-96 flex items-center justify-center">
              <Spinner size={{ base: "lg", lg: "xl" }} />
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {popularCourse?.pages?.map((results) => {
                return results.results?.map((course, idx) => {
                  return <FeaturedCourse key={course?.id} course={course} />;
                });
              })}
            </div>
          )}
          <div className="text-center">
            {hasNextPage ? (
              <Button
                isLoading={isFetchingNextPage}
                onClick={fetchNextPage}
                variant={"ghost"}
                fontWeight={"normal"}
                fontSize={{ base: "xs", lg: "sm" }}
              >
                View More
              </Button>
            ) : (
              !isLoading && <span>No More Courses to show</span>
            )}
          </div>
        </div>
      </div>
      <div className="my-auto">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
