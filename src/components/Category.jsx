import { Button, Select } from "@chakra-ui/react";
import React from "react";

const Category = ({ value, onChange, children, ...rest }) => {
  return (
    <Select {...rest} value={value} onChange={onChange} fontSize={"sm"}>
      <option value="PH">Physics</option>
      <option value="MA">Mathematics</option>
      <option value="FM">Finance & Marketing</option>
      <option value="EC">Economics</option>
      <option value="CS">Computer Science</option>
      {children}
    </Select>
  );
};

export default Category;
