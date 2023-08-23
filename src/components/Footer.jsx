import { Box, FormControl, Input, Text } from "@chakra-ui/react";
import {
  AccountBalanceOutlined,
  AccountBoxOutlined,
  AccountCircleOutlined,
  BookOnlineOutlined,
  BookSharp,
  ContactEmergencyOutlined,
  ContactPageOutlined,
  ExploreOutlined,
  HandshakeOutlined,
  Instagram,
  LinkedIn,
  PrivacyTipOutlined,
  PrivacyTipRounded,
  QuestionAnswerOutlined,
  QuestionAnswerTwoTone,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box className="bg-zinc-950 text-zinc-100">
      <Box className="container py-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:px-16 mb-2">
        <Box className="space-y-2">
          <h2 className="tracking-wide">Legal</h2>
          <Box className="text-zinc-500 text-sm flex flex-col space-y-1">
            <div className="flex items-center gap-1">
              <QuestionAnswerOutlined fontSize="small" />
              <Link to="#" className="hover:underline hover:text-zinc-200">
                FAQ
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <ContactPageOutlined fontSize="small" />
              <Link to="#" className="hover:underline hover:text-zinc-200">
                Contact
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <HandshakeOutlined fontSize="small" />
              <Link to="#" className="hover:underline hover:text-zinc-200">
                Terms & Conditions
              </Link>
            </div>
            <div className="flex items-center gap-1">
              <PrivacyTipOutlined fontSize="small" />
              <Link to="#" className="hover:underline hover:text-zinc-200">
                Privacy Policy
              </Link>
            </div>
          </Box>
        </Box>

        <Box className="mt-3 lg:mt-0 lg:col-span-3 lg:place-self-end">
          <Box className="space-y-2">
            <Text className="">Subscribe newsletter for latest updates</Text>
            <FormControl className="flex gap-2">
              <input
                type="email"
                placeholder="youremail@domail.com"
                className="py-2 text-xs mg:text-sm bg-transparent border-b outline-none w-48 lg:w-60"
              />
              <button className="text-xs py-1 px-2 bg-emerald-600 border border-emerald-600 rounded">
                Subscribe
              </button>
            </FormControl>
          </Box>
          <Box className="space-x-2 mt-2">
            <Instagram fontSize="small" />
            <YouTube fontSize="small" />
            <Twitter fontSize="small" />
            <LinkedIn fontSize="small" />
          </Box>
        </Box>
      </Box>
      <Box className=" border-t-[1px] container py-4 lg:px-16 md:flex md:justify-between">
        <Link to="/" className="text-base">
          Gen
        </Link>
        <Text className="text-zinc-500 text-xs">
          copyright &copy; {new Date().getFullYear()} to{" "}
          <span className="text-sm">Gen</span> Inc.
        </Text>
      </Box>
    </Box>
  );
};

export default Footer;
