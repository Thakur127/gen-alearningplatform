import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  InputLeftAddon,
  InputGroup,
  Button,
  IconButton,
  Select,
  InputRightAddon,
} from "@chakra-ui/react";
import AutoResizeTextarea from "../../AutoResizeTextarea";
import { AddCircleOutline, Delete } from "@mui/icons-material";
import { useRecoilState } from "recoil";
import newCourseFormState from "../../../atoms/newCourseFormState";
import Category from "../../Category";
import { useQuery } from "react-query";
import getSymbolFromCurrency from "currency-symbol-map";

import axiosInstance from "../../../api/axios";

const CourseForm = ({ ...rest }) => {
  const [values, setValues] = useRecoilState(newCourseFormState);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [outcomes, setOutcomes] = useState(() => {
    try {
      return JSON.parse(values?.outcomes) || [""];
    } catch (error) {
      return [""];
    }
  });
  const [prerequisites, setPrerequisites] = useState(() => {
    try {
      return JSON.parse(values?.prerequisites) || [""];
    } catch (error) {
      return [""];
    }
  });

  const handleChange = (e) => {
    setValues((prevData) => {
      return { ...prevData, [e.target.id]: e.target.value };
    });
  };

  const handleChangeOutcomes = async (index, value) => {
    const updatedOutcomes = [...outcomes];
    updatedOutcomes[index] = value;
    setOutcomes(updatedOutcomes);
  };

  const handleChangePrerequisites = async (index, value) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index] = value;
    setPrerequisites(updatedPrerequisites);
  };

  useEffect(() => {
    setValues((prevData) => {
      return {
        ...prevData,
        outcomes: JSON.stringify(outcomes),
      };
    });
    setValues((prevData) => {
      return {
        ...prevData,
        prerequisites: JSON.stringify(prerequisites),
      };
    });
  }, [outcomes, prerequisites]);

  useEffect(() => {
    console.table(values);
  }, [values]);

  const { data: availableCurrencies } = useQuery({
    queryKey: ["available-currencies"],
    queryFn: async () => {
      const { data } = await axiosInstance.get(
        "/payments/available-currencies/"
      );
      return data;
    },
    onSuccess: (data) => {
      setValues((prevData) => {
        return {
          ...prevData,
          currency: "INR",
        };
      });
    },
  });

  return (
    <Box>
      <FormControl isRequired>
        <Box className="mb-3">
          <FormLabel>Category</FormLabel>
          <Category
            id="category"
            focusBorderColor="zinc.900"
            placeholder="Choose Category"
            value={values?.category}
            onChange={handleChange}
          />
        </Box>
      </FormControl>
      <FormControl isRequired>
        <Box className="mb-3">
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            id="title"
            focusBorderColor="zinc.900"
            type="text"
            fontSize={"sm"}
            // className="!text-sm md:!text-base"
            value={values?.title}
            onChange={handleChange}
          />

          <FormHelperText>Name/title of the course</FormHelperText>
        </Box>
      </FormControl>
      <FormControl isRequired>
        <Box className="mb-3">
          <FormLabel htmlFor="description">Description</FormLabel>
          <AutoResizeTextarea
            id="description"
            type="text"
            // className="!text-sm md:!text-base"
            value={values?.description}
            onChange={handleChange}
          />
          <FormHelperText>A short description of the course</FormHelperText>
        </Box>
      </FormControl>
      <FormControl isRequired>
        <Box className="mb-3">
          <FormLabel htmlFor="price">Price</FormLabel>
          <InputGroup>
            <InputLeftAddon
              children={`${getSymbolFromCurrency(values?.currency)}`}
            />
            <Input
              id="price"
              focusBorderColor="zinc.900"
              type="number"
              min="0"
              fontSize={"sm"}
              value={values?.price}
              onChange={handleChange}
            />
            <InputRightAddon padding={0}>
              <Select
                roundedLeft={0}
                focusBorderColor="zinc.900"
                fontSize={"sm"}
                width={"full"}
                value={values?.currency}
                onChange={(e) => {
                  setValues((prevData) => {
                    return {
                      ...prevData,
                      currency: e.target.value,
                    };
                  });
                }}
              >
                {availableCurrencies?.map((currency, idx) => {
                  return (
                    <option key={idx} value={currency.code}>
                      {currency.code}
                    </option>
                  );
                })}
              </Select>
            </InputRightAddon>
          </InputGroup>
          <FormHelperText>Price of the course</FormHelperText>
        </Box>
      </FormControl>
      <FormControl isRequired>
        <Box className="mb-3">
          <FormLabel htmlFor="outcome">Outcome of the course</FormLabel>
          <div className="space-y-2">
            {outcomes.map((outcome, idx) => {
              return (
                <div key={idx} className="flex gap-1">
                  <Input
                    id={idx}
                    name={`outcome${idx}`}
                    type="text"
                    focusBorderColor="zinc.900"
                    fontSize={"sm"}
                    value={outcome}
                    onChange={(e) => {
                      handleChangeOutcomes(idx, e.target.value);
                    }}
                  />
                  <IconButton
                    isDisabled={outcomes.length <= 1}
                    bg={"red.500"}
                    color={"gray.100"}
                    _hover={{
                      bg: "red.500",
                      opacity: "80%",
                    }}
                    _active={{
                      bg: "red.600",
                      opacity: "100%",
                    }}
                    onClick={() => {
                      const updatedOutcomes = [...outcomes];
                      updatedOutcomes.pop(idx);
                      setOutcomes(updatedOutcomes);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </div>
              );
            })}
          </div>
          <Button
            isDisabled={!outcomes[outcomes.length - 1].length}
            marginTop={"2"}
            fontSize={"sm"}
            fontWeight={"regular"}
            colorScheme="green"
            rounded={"4"}
            size={"sm"}
            onClick={() => {
              setOutcomes((prevData) => {
                return [...prevData, ""];
              });
            }}
            leftIcon={<AddCircleOutline fontSize="small" />}
          >
            Add More
          </Button>
          <FormHelperText>What would a student learn from it.</FormHelperText>
        </Box>
      </FormControl>
      <FormControl>
        <Box className="mb-3">
          <FormLabel htmlFor="prerequisites">Prerequisites</FormLabel>
          <div className="space-y-2">
            {prerequisites.map((prerequisite, idx) => {
              return (
                <div key={idx} className="flex gap-1">
                  <Input
                    id={idx}
                    name={`prerequisite${idx}`}
                    type="text"
                    focusBorderColor="zinc.900"
                    fontSize={"sm"}
                    value={prerequisite}
                    onChange={(e) => {
                      handleChangePrerequisites(idx, e.target.value);
                    }}
                  />
                  <IconButton
                    isDisabled={prerequisites.length <= 1}
                    bg={"red.500"}
                    color={"gray.100"}
                    _hover={{
                      bg: "red.500",
                      opacity: "80%",
                    }}
                    _active={{
                      bg: "red.600",
                      opacity: "100%",
                    }}
                    onClick={() => {
                      const updatedPrerequisites = [...prerequisites];
                      updatedPrerequisites.pop(idx);
                      setPrerequisites(updatedPrerequisites);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </div>
              );
            })}
          </div>
          <Button
            isDisabled={!prerequisites[prerequisites.length - 1].length}
            marginTop={"2"}
            fontSize={"sm"}
            fontWeight={"regular"}
            colorScheme="green"
            rounded={"4"}
            size={"sm"}
            onClick={() => {
              setPrerequisites((prevData) => {
                return [...prevData, ""];
              });
            }}
            leftIcon={<AddCircleOutline fontSize="small" />}
          >
            Add More
          </Button>
          <FormHelperText>
            Any prerequisites/requirements to start this course. Leave if no
            prerequisite are required.
          </FormHelperText>
        </Box>
      </FormControl>
      <FormControl isRequired>
        <Box className="mb-3">
          <FormLabel htmlFor="languages">Languages</FormLabel>
          <Input
            id="languages"
            type="text"
            focusBorderColor="zinc.900"
            value={values?.languages}
            onChange={handleChange}
            fontSize={"sm"}
          />
          <FormHelperText>
            Write the language of course. If multiple language used in videos
            write using comma seprated. e.g., English, Hindi etc.
          </FormHelperText>
        </Box>
      </FormControl>
      <FormControl>
        <Box className="mb-3">
          <FormLabel htmlFor="captions">Caption</FormLabel>
          <Input
            id="captions"
            type="text"
            focusBorderColor="zinc.900"
            value={values?.captions}
            onChange={handleChange}
            fontSize={"sm"}
          />
          <FormHelperText>
            Write language of caption if available.
          </FormHelperText>
        </Box>
      </FormControl>
    </Box>
  );
};

export default CourseForm;
