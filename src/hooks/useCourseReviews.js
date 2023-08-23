import { useState } from "react";
import { useQuery } from "react-query";
import axiosInstance from "../api/axios";

const useCourseReviews = (course) => {
  const [courseRating, setCourseRating] = useState({
    rating: 0,
    total: 0,
  });

  const reviews = useQuery({
    queryKey: ["reviews", course],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/course/${course}/reviews/`);
      return data;
    },
    enabled: !!course,
    onSuccess: (data) => {
      let ratingSum = 0;
      let count = 0;
      for (let i = 0; i < data.length; i++) {
        ratingSum += data[i].rating;
        count++;
      }

      setCourseRating({
        rating: ratingSum / count,
        total: count,
      });
    },
  });

  return {
    ...reviews,
    courseRating,
  };
};

export default useCourseReviews;
