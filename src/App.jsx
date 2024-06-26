import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

// public pages
import UnauthorisedRoute from "./components/Routes/UnauthorisedRoute";
import Signin from "./pages/Auth/Signin";
import Signup from "./pages/Auth/Signup";
import SignupTeacher from "./pages/Auth/SignupTeacher";
import ResetPassword from "./pages/Auth/ResetPassword";
import VerifyEmail from "./pages/Auth/VerifyEmail";

// protected pages
import HomePage from "./pages/HomePage";
import CourseDetailPage from "./pages/Course/CourseDetailPage";
import MyCoursesPage from "./pages/Course/MyCoursesPage";
import EnrolledCoursesPage from "./pages/Course/EnrolledCoursesPage";
import ProtectedRoute from "./components/Routes/ProtectedRoute";

import Signout from "./components/Authentication/Signout";
import LectureDetailPage from "./pages/Course/LectureDetailPage";
import NewCoursePage from "./pages/Course/NewCoursePage";
import ProfilePage from "./pages/Account/ProfilePage";
import MyProfilePage from "./pages/Account/MyProfilePage";
import TransactionHistoryPage from "./pages/Account/TransactionHistoryPage";
import TransactionDetailPage from "./pages/Account/TransactionDetailPage";
import SearchPage from "./pages/SearchPage";
import Error404 from "./pages/Error404";
import useGetUser from "./hooks/useGetUser";
import PaymentSuccessPage from "./pages/PaymentSuccessPage";
import PaymentFailedPage from "./pages/PaymentFailedPage";
import { Spinner } from "@chakra-ui/react";
import useAuth from "./hooks/useAuth";

const ROLES = {
  Teacher: "Teacher",
  Student: "Student",
};

const App = () => {
  const user = useGetUser();
  const isAuthenticated = useAuth();
  return (
    <div className="bg-slate-100 text-zinc-800 min-h-screen !antialiased flex flex-col relative">
      {isAuthenticated && !user?.data?.email && (
        <div className="absolute left-0 top-0 w-full h-screen bg-slate-100 z-[1000] py-12 container flex">
          <Spinner size={"xl"} className="m-auto" />
        </div>
      )}
      <Router>
        <Header />
        <div className="flex-grow relative">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:course_id/" element={<CourseDetailPage />} />
            <Route path="/search/" element={<SearchPage />} />
            <Route path="/profile/:username/" element={<ProfilePage />} />

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[ROLES.Teacher, ROLES.Student]} />
              }
            >
              <Route path="/profile/me/" element={<MyProfilePage />} />
              <Route path="/dashboard/" element={<EnrolledCoursesPage />} />

              <Route
                path="/course/:course_id/lecture/:lecture_id/"
                element={<LectureDetailPage />}
              />
              <Route
                path="/payment/success/:session_id/:course_id/"
                element={<PaymentSuccessPage />}
              />
              <Route
                path="/payment/failed/:course_id/"
                element={<PaymentFailedPage />}
              />
              <Route
                path="/transactions/"
                element={<TransactionHistoryPage />}
              />
              <Route
                path="/transaction/:transaction_id/"
                element={<TransactionDetailPage />}
              />
              <Route path="/logout/" element={<Signout />} />
            </Route>

            {/* Protected Routes for teacher */}
            <Route element={<ProtectedRoute allowedRoles={[ROLES.Teacher]} />}>
              <Route path="/create-course/" element={<NewCoursePage />} />
              <Route path="/my-courses/" element={<MyCoursesPage />} />
            </Route>

            {/* Unauthorised Routes */}
            <Route element={<UnauthorisedRoute />}>
              <Route path="/login" element={<Signin />} />
              <Route path="/register" element={<Signup />} />
              <Route
                path="/register-as-a-teacher/"
                element={<SignupTeacher />}
              />
              <Route path="/verify-email/:key" element={<VerifyEmail />} />
              <Route
                path="/password-reset/:uid/:token/"
                element={<ResetPassword />}
              />
            </Route>
            {/* Error Page */}
            <Route path="/*" element={<Error404 />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
