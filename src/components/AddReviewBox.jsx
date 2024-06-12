import { useState } from "react";
import AutoResizeTextarea from "./AutoResizeTextarea";
import { useMutation, useQuery } from "react-query";
import { Button, useToast } from "@chakra-ui/react";
import { Fragment } from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import axiosInstance from "../api/axios";

const AddReviewBox = ({ course_id }) => {
  const [review, setReview] = useState({
    review: "",
    rating: 0,
    course: course_id,
  });

  const toast = useToast();

  const { refetch } = useQuery({
    queryKey: ["reviews", course_id],
  });

  const addReview = useMutation(
    async (e) => {
      e.preventDefault();
      const { data } = await axiosInstance.post(
        `/course/${course_id}/reviews/`,
        review
      );
      return data;
    },
    {
      onSuccess: (data) => {
        setReview((prevData) => {
          return {
            ...prevData,
            review: "",
            rating: 0,
          };
        });
        toast({
          title: "Review Added",
          description: data.review,
          position: "bottom-right",
          isClosable: true,
          status: "success",
          duration: 5000,
        });
        refetch();
      },
    }
  );

  return (
    <form onSubmit={addReview.mutate}>
      <div className="flex mb-2">
        {[1, 2, 3, 4, 5].map((val) => {
          return (
            <Fragment key={val}>
              <label htmlFor={val}>
                <StarIcon
                  className={`w-6 h-6 cursor-pointer ${
                    val <= review.rating
                      ? "fill-orange-500 stroke-orange-500"
                      : "fill-orange-500/20 stroke-orange-500/20"
                  }`}
                />
              </label>
              <input
                id={val}
                value={val}
                name="rating"
                type="radio"
                onChange={(e) => {
                  setReview((prevData) => {
                    return {
                      ...prevData,
                      rating: e.target.value,
                    };
                  });
                }}
                className="hidden"
              />
            </Fragment>
          );
        })}
      </div>
      <AutoResizeTextarea
        placeholder="Add your review"
        value={review.review}
        onChange={(e) => {
          setReview((prevData) => {
            return {
              ...prevData,
              review: e.target.value,
            };
          });
        }}
      />
      <Button
        isLoading={addReview.isLoading}
        isDisabled={review?.review === "" || review?.rating === 0}
        variant={"primary"}
        type="submit"
      >
        Post
      </Button>
    </form>
  );
};

export default AddReviewBox;
