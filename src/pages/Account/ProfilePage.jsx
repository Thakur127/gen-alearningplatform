import React from "react";
import Profile from "../../components/Account/Profile";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axiosInstance from "../../api/axios";
import useUserCourses from "../../hooks/useUserCourses";

const ProfilePage = () => {
  const { username } = useParams();

  const { data: user } = useQuery({
    queryKey: ["user-profile", username],
    queryFn: async () => {
      const { data } = await axiosInstance.get(`/auth/user/${username}/`);
      return data;
    },
    enabled: !!username,
  });

  const { data: courses } = useUserCourses(user?.username, user?.role);

  return (
    <div>
      <Profile user={user} courses={courses} />
    </div>
  );
};

export default ProfilePage;
