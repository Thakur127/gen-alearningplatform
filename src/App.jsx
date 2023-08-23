import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Header from "./components/Header";
// Pages

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

import Signout from "./components/Signout";
import LectureDetailPage from "./pages/Course/LectureDetailPage";
import NewCoursePage from "./pages/Course/NewCoursePage";
import ProfilePage from "./pages/Account/ProfilePage";
import MyProfilePage from "./pages/Account/MyProfilePage";
import PaymentCompletedPage from "./pages/PaymentCompletedPage";
import TransactionHistoryPage from "./pages/Account/TransactionHistoryPage";
import TransactionDetailPage from "./pages/Account/TransactionDetailPage";
import SearchPage from "./pages/SearchPage";

const ROLES = {
  Teacher: "Teacher",
  Student: "Student",
};

const App = () => {
  return (
    <div className="bg-slate-100 text-zinc-800 min-h-screen !antialiased flex flex-col">
      <Router>
        <Header />
        <div className="flex-grow relative">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/course/:course_id/" element={<CourseDetailPage />} />
            <Route path="/search/" element={<SearchPage />} />

            {/* Protected Routes */}
            <Route
              element={
                <ProtectedRoute allowedRoles={[ROLES.Teacher, ROLES.Student]} />
              }
            >
              <Route path="/profile/me/" element={<MyProfilePage />} />
              <Route path="/profile/:username/" element={<ProfilePage />} />
              <Route path="/dashboard/" element={<EnrolledCoursesPage />} />

              <Route
                path="/course/:course_id/lecture/:lecture_id/"
                element={<LectureDetailPage />}
              />
              <Route
                path="/payment/completed/"
                element={<PaymentCompletedPage />}
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
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default App;
