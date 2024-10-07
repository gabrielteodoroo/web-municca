import { Box, Heading } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <Box>
      <Heading size="lg" mb={4}>
        Bem-vindo ao Dashboard!
      </Heading>
      <Box>
        <p>Esta é a sua área principal de conteúdo.</p>
      </Box>
    </Box>
  );
};

export default Dashboard;
