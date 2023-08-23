import React, { useEffect, useState } from "react";
import Profile from "../../components/Account/Profile";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axiosInstance from "../../api/axios";
import useUserCourses from "../../hooks/useUserCourses";

const ProfilePage = () => {
  const [selectedContent, setSelectedContent] = useState(null);
  const { username } = useParams();

  const params = new URLSearchParams(window.location.search);
  console.log(params);
  console.log(window.location.search);

  useEffect(() => {
    console.log(params.get("content"));
    setSelectedContent(params.get("content"));
  }, [params]);

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
