import React from "react";
import useGetUser from "../../hooks/useGetUser";
import {
  Avatar,
  Button,
  ButtonGroup,
  Divider,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import {
  EllipsisVerticalIcon,
  PencilSquareIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import EditProfileModal from "../../components/EditProfileModal";
import FeaturedCourse from "../FeaturedCourse";
import { useNavigate } from "react-router-dom";
import ChangePasswordModal from "./ChangePasswordModal";
import { useState } from "react";
import { PasswordOutlined } from "@mui/icons-material";
import ChangeProfilePictureModal from "./ChangeProfilePictureModal";

const Profile = ({ user, courses }) => {
  //   console.log(user);

  const [pIsOpen, setPIsOpen] = useState(false);
  const { data: currentUser } = useGetUser();
  const { onOpen, onClose, isOpen } = useDisclosure();
  const navigate = useNavigate();

  const pOnOpen = () => {
    // opens password change modal
    setPIsOpen(true);
  };

  const pOnClose = () => {
    // closes password change modal
    setPIsOpen(false);
  };

  const {
    onOpen: avatarOnOpen,
    onClose: avatarOnClose,
    isOpen: avatarIsOpen,
  } = useDisclosure();

  return (
    <>
      {user ? (
        <div className="container py-4 lg:px-16">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-2xl lg:text-3xl font-semibold">Profile</h2>
              {currentUser?.email == user?.email ? (
                <div className="">
                  <Menu>
                    <MenuButton>
                      <EllipsisVerticalIcon className="w-5 h-5" />
                    </MenuButton>
                    <MenuList fontSize={"sm"}>
                      <MenuItem
                        onClick={onOpen}
                        icon={<PencilSquareIcon className="w-5 h-5" />}
                      >
                        Edit Profile
                        <EditProfileModal
                          onClose={onClose}
                          isOpen={isOpen}
                          user={user}
                        />
                      </MenuItem>
                      <MenuItem
                        onClick={avatarOnOpen}
                        icon={<UserIcon className="w-5 h-5" />}
                      >
                        Change Profile Picture
                        <ChangeProfilePictureModal
                          onClose={avatarOnClose}
                          isOpen={avatarIsOpen}
                          user={user}
                        />
                      </MenuItem>
                      <MenuItem
                        onClick={pOnOpen}
                        icon={<PasswordOutlined fontSize="small" />}
                      >
                        Change Password
                        <ChangePasswordModal
                          onClose={pOnClose}
                          isOpen={pIsOpen}
                        />
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-wrap gap-6 lg:gap-24 relative p-4 lg:ml-16">
              <div className="w-full text-center lg:w-fit">
                <Avatar
                  name={user?.first_name}
                  src={user?.image_url}
                  size={{ base: "2xl" }}
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                />
                <p className="text-center">{user?.username}</p>
              </div>
              <div>
                <h3 className="text-xl lg:text-2xl text-medium">
                  {user?.first_name} {user?.last_name}
                </h3>
                <p className="text-gray-500 text-sm">{user?.role}</p>
                <div className="mt-4 space-y-1sa">
                  <h4 className="font-medium">Bio</h4>
                  <p className="text-sm">{user?.bio}</p>

                  {user?.username === currentUser?.username && !user?.bio && (
                    <Button
                      colorScheme="blue"
                      fontSize={"xs"}
                      size={"sm"}
                      fontWeight={"regular"}
                      onClick={onOpen}
                    >
                      Add bio
                    </Button>
                  )}
                </div>
                <div className="mt-4 space-y-1">
                  <h4 className="font-medium">Qualifications</h4>
                  <ul>
                    {user?.qualifications
                      ?.split(",")
                      ?.map((qualification, idx) => {
                        return (
                          <li
                            className="text-sm list-disc list-inside"
                            key={idx}
                          >
                            {qualification}
                          </li>
                        );
                      })}
                    {user?.username === currentUser?.username &&
                      !user?.qualifications && (
                        <Button
                          colorScheme="blue"
                          fontSize={"xs"}
                          size={"sm"}
                          fontWeight={"regular"}
                          onClick={onOpen}
                        >
                          Add qualifications
                        </Button>
                      )}
                  </ul>
                </div>

                {user?.role === "Teacher" ? (
                  <div className="mt-4 flex gap-4">
                    <p className="text-blue-500 underline underline-offset-4">
                      {courses?.length} Courses
                    </p>
                    <p className="text-blue-500">0 Collaborations</p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
          {user?.role === "Teacher" && (
            <>
              <Divider className="h-[1px] bg-black my-4" />
              <div>
                <h2 className="text-2xl lg:text-3xl font-semibold">Courses</h2>
                <div className="grid gap-2 mt-4 sm:grid-cols-2 lg:gap-4 xl:grid-cols-3 2xl:grid-cols-4">
                  {courses?.map((course, idx) => {
                    return (
                      <div key={idx}>
                        <FeaturedCourse course={course} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 h-full flex justify-center items-center">
          <Spinner size={"xl"} />
        </div>
      )}
    </>
  );
};

export default Profile;
