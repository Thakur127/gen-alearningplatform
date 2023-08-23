import {
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  ChevronDoubleLeftIcon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../api/axios";
import { useEffect } from "react";
import { useQuery, useInfiniteQuery } from "react-query";
import FeaturedCourse from "../components/FeaturedCourse";
import { Spinner } from "@chakra-ui/react";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({ q: "" });
  const location = useLocation();

  const {
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    data: courses,
  } = useInfiniteQuery({
    queryKey: ["search-courses", { q: searchParams.get("q") }],
    queryFn: async ({ pageParam }) => {
      const uri = `/courses/?${pageParam ? "cursor=" + pageParam : ""}${
        searchParams.get("q") ? "&q=" + searchParams.get("q") : ""
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
    enabled: !!searchParams.get("q"),
  });

  const handleSearchInputChange = (e) => {
    const newQuery = e.target.value;

    // Replace the current query in the URL's search params
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("q", newQuery);

    // Replace the history state with the updated search params
    navigate(`?${newSearchParams.toString()}`, { replace: true });

    // Update the state for the query
    setSearchParams({ q: newQuery });
  };

  // handles fetching next page
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 200) {
        // Fetch next page of data
        if (!isFetchingNextPage && hasNextPage) {
          fetchNextPage();
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-200 container py-6 lg:px-16 space-y-8">
      <section>
        <form className="flex gap-4 items-center justify-evenly">
          <span
            className="hover:bg-gray-300 p-2 rounded-full cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </span>
          <div className="flex-1 w-4/5 relative">
            <input
              autoFocus
              id="q"
              type="text"
              value={searchParams.get("q")}
              onChange={handleSearchInputChange}
              placeholder="Search course..."
              className="w-full rounded-full py-3 px-4 pr-9 outline-none text-sm text-gray-600 focus:ring-2 ring-gray-300"
            />
            <span className="absolute top-3 right-3">
              {searchParams.get("q") ? (
                <XMarkIcon
                  className="w-5 h-5  cursor-pointer"
                  onClick={() => {
                    setSearchParams((prevData) => {
                      return {
                        ...prevData,
                        q: "",
                      };
                    });
                  }}
                />
              ) : (
                <label htmlFor="q">
                  <MagnifyingGlassIcon className="w-5 h-5 cursor-pointer" />
                </label>
              )}
            </span>
          </div>
          <AdjustmentsHorizontalIcon className="h-5 w-5 cursor-pointer" />
        </form>
      </section>
      <section>
        {courses ? (
          <div className="grid gap-4 sm:gap-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 ">
            {courses?.pages?.map((results) => {
              return results.results?.map((course, idx) => {
                return <FeaturedCourse key={course?.id} course={course} />;
              });
            })}
          </div>
        ) : (
          <></>
        )}
        {isLoading && (
          <div className="w-full flex justify-center mt-12">
            <Spinner size={"lg"} />
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchPage;
