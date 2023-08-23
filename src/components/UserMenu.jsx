import React from "react";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuGroup,
  MenuDivider,
  Avatar,
  Box,
  Text,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const UserMenu = ({ user }) => {
  return (
    <Menu islazy>
      <MenuButton>
        <Flex alignItems={"center"} gap={2}>
          <Avatar name={user?.username} size="md" src={user?.image_url} />
          <Box className="text-left leading-none hidden md:block">
            <Text fontWeight={500} className="text-lg leading-none">
              {user?.first_name} {user?.last_name}
            </Text>
            <Text as="span" className=" text-xs lg:text-sm text-gray-500">
              {user?.role}
            </Text>
          </Box>
        </Flex>
      </MenuButton>
      <MenuList className="text-sm text-zinc-800">
        <MenuGroup
          title="Account"
          // className="bg-zinc-200 text-zinc-800 p-2 rounded "
        >
          <Link to="/dashboard/">
            <MenuItem>Dashboard</MenuItem>
          </Link>
          <Link to="/profile/me/">
            <MenuItem>Profile</MenuItem>
          </Link>
          <Link to="/transactions/">
            <MenuItem>Transaction History</MenuItem>
          </Link>
        </MenuGroup>
        <MenuDivider />

        {user?.role === "Teacher" && (
          <>
            <MenuGroup
              title="Course"
              // className="bg-zinc-200 text-zinc-800 p-2 rounded "
            >
              <Link to="/my-courses">
                <MenuItem>My courses</MenuItem>
              </Link>
              <Link to="/create-course">
                <MenuItem>Create Course</MenuItem>
              </Link>
            </MenuGroup>
            <MenuDivider />
          </>
        )}
        <MenuItem>Feedback</MenuItem>
        <MenuItem>Help</MenuItem>
        <MenuDivider />
        <Link to="/logout">
          <MenuItem>Sign Out</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
