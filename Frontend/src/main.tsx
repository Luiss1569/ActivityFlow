import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import Theme from "./styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthContext from "./contexts/AuthContext";
import "./styles/global.css";
import { isAxiosError } from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (isAxiosError(error) && error.response?.status === 404) return false;
        if (failureCount < 2) return true;
        return false;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={Theme}>
      <QueryClientProvider client={queryClient}>
        <AuthContext>
          <App />
        </AuthContext>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
);
