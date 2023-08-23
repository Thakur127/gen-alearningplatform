import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import buttonTheme from "./Chakra-ui/ButtonTheme.js";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif",
  },
  components: {
    Button: buttonTheme,
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);
