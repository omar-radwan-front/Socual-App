import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
} from "flowbite-react";
import { Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export function MyNavbar() {
  const navigate = useNavigate();
  let { UserLogin, setUserLogin } = useContext(UserContext);

  function signout() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  function ChengProfile() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data } = useQuery({
    queryKey: [`ChengProfilePh`],
    queryFn: ChengProfile,
    select: (data) => data?.data?.user,
  });

  return (
    <>
      <Navbar
        fluid
        rounded
        className="sticky top-0 z-50 w-full md:w-[70%] mx-auto rounded-3xl 
        bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-md 
        border border-gray-200 dark:border-gray-700 transition-colors duration-300"
      >
        <Link to="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
            Social App
          </span>
        </Link>

        {UserLogin !== null ? (
          <Dropdown
            className="relative"
            //className=" md:translate-x-[290px] md:translate-y-[58.4px]"
            arrowIcon={false}
            inline
            label={<Avatar alt="User settings" img={data?.photo} rounded />}
          >
            <div className="absolute top-0 right-0 dark:bg-gray-800 bg-gray-100 rounded-xl p-2 shadow-md">
              <DropdownHeader>
                <span className="block text-sm text-gray-900 dark:text-white">
                  {data?.name}
                </span>
                <span className="block truncate text-sm font-medium text-gray-700 dark:text-gray-300">
                  {data?.email}
                </span>
              </DropdownHeader>
              <DropdownDivider />
              <DropdownItem>
                <Link
                  to="profile"
                  className="text-gray-900 dark:text-white hover:underline"
                >
                  profile
                </Link>
              </DropdownItem>
              <DropdownItem className="hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition">
                <span
                  onClick={signout}
                  className="cursor-pointer text-gray-900 dark:text-white font-medium"
                >
                  Sign out
                </span>
              </DropdownItem>
            </div>
          </Dropdown>
        ) : (
          <div className="flex gap-3 ms-2">
            {/* زرار Login */}
            <Button
              className="bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 
              text-white font-semibold rounded-xl shadow-md 
              hover:shadow-lg hover:brightness-110 active:scale-95 
              focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-700 
              w-[80px] md:w-[100px] transition-all duration-200"
            >
              <Link to="login" className="w-full block text-center">
                Login
              </Link>
            </Button>

            {/* زرار Register */}
            <Button
              className="bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 
              text-white font-semibold rounded-xl shadow-md 
              hover:shadow-lg hover:brightness-110 active:scale-95 
              focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-700 
              w-[100px] md:w-[110px] transition-all duration-200"
            >
              <Link to="register" className="w-full block text-center">
                Register
              </Link>
            </Button>
          </div>
        )}

        {/* </div> */}
      </Navbar>
    </>
  );
}
