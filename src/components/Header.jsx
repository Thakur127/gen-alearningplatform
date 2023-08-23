import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import useGetUser from "../hooks/useGetUser";
import useAuth from "../hooks/useAuth";
import ExploreIcon from "@mui/icons-material/Explore";
import { Button } from "@chakra-ui/react";

const Header = () => {
  const isAuthenticated = useAuth();
  const { data: user } = useGetUser();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 bg-zinc-100 shadow-md w-full z-50">
      <div className="container h-fit w-full flex justify-between items-center py-3 lg:px-16">
        <section className="flex gap-8 items-center flex-1">
          <Link
            to={"/"}
            className="text-2xl tracking-wide cursor-pointer font-semibold"
          >
            {isAuthenticated ? (
              <ExploreIcon fontSize="large" titleAccess="Explore" />
            ) : (
              "Gen"
            )}
          </Link>
          {/* Search Bar */}
          <section className="flex-1">
            <input
              onClick={() => {
                navigate("/search/");
              }}
              type="text"
              placeholder="Search course..."
              className="rounded-full py-3 px-4 outline-none text-sm text-gray-600 w-[80%] md:w-[60%]"
            />
          </section>
        </section>

        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <UserMenu user={user} />
          </div>
        ) : (
          <div className="flex items-center gap-2 mg:gap-4 lg:gap-6">
            <Link
              to={"/register-as-a-teacher/"}
              className="text-sm lg:text-base hover:underline underline-offset-4"
            >
              Teach on Gen
            </Link>
            <Link to="/login">
              <Button variant={"primary"}>Login</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
