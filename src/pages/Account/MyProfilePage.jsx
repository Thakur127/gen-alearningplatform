import React from "react";
import useGetUser from "../../hooks/useGetUser";
import useMyCourses from "../../hooks/useMyCourses";
import Profile from "../../components/Account/Profile";

const MyProfilePage = () => {
  const { data: user } = useGetUser();
  const { data: courses } = useMyCourses();
  return (
    <div>
      <Profile user={user} courses={courses} />
    </div>
  );
};

export default MyProfilePage;
