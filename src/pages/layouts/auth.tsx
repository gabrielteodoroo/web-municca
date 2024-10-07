import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <Flex minH={"100vh"} flexDirection={"column"} background={"#696969"}>
      <Outlet />
    </Flex>
  );
}
