import React from "react";

import error404 from "../assets/svgs/page404.svg";
import { Button, Image } from "@chakra-ui/react";
import BackButton from "../components/BackButton";

const Error404 = () => {
  return (
    <div className="container py-4 lg:px-16">
      <BackButton />
      <Image src={error404} className="w-2/3 m-auto" />
    </div>
  );
};

export default Error404;
