import React, { useState, useEffect, useRef } from "react";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Delete, Reply } from "@mui/icons-material";
import useGetUser from "../hooks/useGetUser";
import { useMutation } from "react-query";
import axiosInstance from "../api/axios";
import moment from "moment/moment";

const Testimonial = ({ review }) => {
  const { data: currentUser } = useGetUser();
  const [isDeleted, setIsDeleted] = useState(false);

  const toast = useToast();

  const { mutate: deleteReview } = useMutation(
    async () => {
      const { data } = await axiosInstance.delete(
        `/course/review/${review?.id}`
      );
      return data;
    },
    {
      onSuccess: () => {
        toast({
          title: "Review Deleted.",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
          status: "success",
        });

        setIsDeleted(true);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return (
    <div
      className={`flex p-2 gap-2 border my-2 rounded shadow-[8px_8px_1px_#fff] ${
        isDeleted
          ? "transition-all scale-y-0 duration-300 opacity-0 hidden"
          : ""
      }`}
    >
      <section>
        <Avatar src={review.owner?.cover_img} name={review?.owner?.username} />
      </section>
      <section className="flex-1">
        <div className="flex items-start justify-between">
          <section>
            <Link
              to={`/profile/${review.owner?.username}/`}
              className="text-gray-100 hover:underline underline-offset-2"
            >
              {review.owner?.username}
            </Link>
            <span className="text-gray-500 ml-2 text-xs">
              {moment(new Date(review?.created_at).toUTCString()).fromNow()}
            </span>
            <Rating rating={review?.rating} />
          </section>
          <Menu size={"sm"}>
            <MenuButton>
              <EllipsisVerticalIcon className="w-4 h-4 text-gray-100 cursor-pointer" />
            </MenuButton>
            <MenuList fontSize={"sm"}>
              <MenuItem icon={<Reply fontSize="small" />}>Reply</MenuItem>
              {review.owner?.email === currentUser?.email && (
                <>
                  <MenuDivider />
                  <MenuItem
                    icon={<Delete fontSize="small" />}
                    bgColor={"red.500"}
                    color={"gray.100"}
                    rounded={"md"}
                    onClick={deleteReview}
                  >
                    Delete
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </div>
        <p className="text-gray-400 text-sm mt-2">{review?.review}</p>
      </section>
    </div>
  );
};

export default Testimonial;
