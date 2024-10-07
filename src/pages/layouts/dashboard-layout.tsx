import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Flex height="100vh">
      <Box width="250px" bg="gray.800" color="white" padding="20px">
        <Heading as="h2" size="lg" mb="4">
          Meu Dashboard
        </Heading>
        <nav>
          <Link
            to="/dashboard"
            style={{ display: "block", marginBottom: "10px", color: "white" }}
          >
            Home
          </Link>
          <Link
            to="/dashboard/profile"
            style={{ display: "block", marginBottom: "10px", color: "white" }}
          >
            Perfil
          </Link>
          <Link
            to="/dashboard/documents"
            style={{ display: "block", marginBottom: "10px", color: "white" }}
          >
            Documentos
          </Link>
        </nav>
      </Box>

      <Box flex="1" padding="20px" bg="gray.100">
        {children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
