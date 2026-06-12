import { Box, Button, Container, Image } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box borderBottom=".5px solid #cbd5e1">
      <Container maxW="container.xl">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          py={2}
        >
          <Box>
            <Image
              src="/logos/Reqdesk Logo - no bg.png"
              alt="reqdesk logo"
              height={{ base: "10vh", md: "7vh", lg: "7vh" }}
            />
          </Box>
          <Box>
            <Button
              bg="#2563eb"
              color="#fff"
              _hover={{ bg: "#1d4ed8" }}
              transition="all 0.3s ease"
            >
              View Requests
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
