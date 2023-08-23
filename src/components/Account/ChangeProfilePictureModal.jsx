import {
  Avatar,
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import uploadImage from "../../lib/uploadImage";
import axiosInstance from "../../api/axios";
import { useQuery } from "react-query";

const ChangeProfilePictureModal = ({ onClose, isOpen, user }) => {
  const [profileImg, setProfileImg] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const preview = useRef();

  const { refetch } = useQuery({
    queryKey: "currentUser",
  });

  useEffect(() => {
    if (profileImg) {
      const img_uri = URL.createObjectURL(profileImg);
      preview.current.src = img_uri;
    }
  }, [profileImg]);

  const handleClose = () => {
    setProfileImg(null);
    onClose();
  };

  const uploadProfileImage = async () => {
    setIsUploading(true);
    try {
      const image = await uploadImage(profileImg);
      const res = await axiosInstance.patch("/auth/user/", {
        image_url: image?.data.secure_url,
      });
      refetch();
    } catch {}
    setIsUploading(false);
  };

  return (
    <Modal onClose={handleClose} isOpen={isOpen}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Profile Picture</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="">
          <FormControl>
            <FormLabel htmlFor="profile-img">
              <div className="m-auto w-fit relative group cursor-pointer text-center space-y-2">
                <Image
                  ref={preview}
                  src={user?.image_url}
                  alt=""
                  height={"200px"}
                  width={"200px"}
                  objectFit={"cover"}
                  rounded={"full"}
                  bg={"gray.400"}
                  borderColor={"gray.400"}
                  margin={"auto"}
                />
                <Text as="span" fontSize={"sm"}>
                  {profileImg?.name}
                </Text>
                <Text className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm group-hover:inline hidden">
                  {" "}
                  Click here to Upload Image
                </Text>
                {!(user?.image_url && profileImg) && (
                  <Text className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm">
                    Click here to Upload Image
                  </Text>
                )}
              </div>
            </FormLabel>
            <Input
              id="profile-img"
              type="file"
              className="hidden"
              onChange={(e) => {
                setProfileImg(e.target.files[0]);
              }}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            isDisabled={!profileImg}
            isLoading={isUploading}
            variant={"primary"}
            float={"right"}
            onClick={uploadProfileImage}
          >
            Change
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ChangeProfilePictureModal;
