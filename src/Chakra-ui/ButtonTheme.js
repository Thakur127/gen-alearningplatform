import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const primary = defineStyle({
  backgroundColor: "#02050a",
  border: "1px solid #02050a",
  color: "#f0f2f5",
  fontWeight: "400",
  fontSize: "sm",
  paddingX: "1rem",
  borderRadius: "6px",
});

const buttonTheme = defineStyleConfig({
  variants: { primary },
  defaultProps: {
    fontWeight: "regular",
  },
});

export default buttonTheme;
