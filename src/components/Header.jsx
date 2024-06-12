import { Link, useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";
import useGetUser from "../hooks/useGetUser";
import useAuth from "../hooks/useAuth";
import ExploreIcon from "@mui/icons-material/Explore";
import { Button } from "@chakra-ui/react";
import { SearchOffOutlined, SearchOutlined } from "@mui/icons-material";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const isAuthenticated = useAuth();
  const { data: user } = useGetUser();
  const navigate = useNavigate();

  return (
    <div className="sticky top-0 bg-zinc-100 shadow-md w-full z-50">
      <div className="container h-fit w-full flex justify-between items-center py-3 lg:px-16">
        <section className="flex gap-2 sm:gap-4 md:gap-8 items-center flex-1">
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
            <div className="hidden md:block relative">
              <input
                onClick={() => {
                  navigate("/search/");
                }}
                type="text"
                placeholder="Search course..."
                className="rounded-full py-3 px-4 outline-none text-sm text-gray-600 w-[80%] md:w-[60%] indent-5"
              />

              <MagnifyingGlassIcon className="w-5 h-5 absolute top-1/2 -translate-y-1/2 left-2.5" />
            </div>
            <span
              className="inline-flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded-full px-3 md:hidden"
              onClick={() => {
                navigate("/search/");
              }}
            >
              <MagnifyingGlassIcon className="w-5 h-5" />
              <p>Search</p>
            </span>
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
