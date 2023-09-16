import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const primary = defineStyle({
  backgroundColor: "#02050a",
  border: "1px solid #02050a",
  color: "#f0f2f5",
  fontWeight: "400",
  fontSize: "sm",
  paddingX: "1rem",
  borderRadius: "6px",
  _hover: {
    _disabled: {
      bg: "gray.900",
      color: "gray.200",
      borderColor: "gray.900",
    },
  },

  _disabled: {
    bg: "gray.900",
    color: "gray.200",
    borderColor: "gray.900",
  },
});

const buttonTheme = defineStyleConfig({
  variants: { primary },
  defaultProps: {
    fontWeight: "regular",
  },
});

export default buttonTheme;
