import { ArrowBackIcon } from "@chakra-ui/icons";
import { Box, Button, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
        px={{ base: 4, md: 6, lg: 10 }}
        borderBottom=".5px solid #cbd5e1"
      >
        <Box>
          <Image
            src="/logos/Reqdesk Logo - no bg.png"
            alt="reqdesk logo"
            height={{ base: "8vh", md: "6vh" }}
            cursor="pointer"
            onClick={() => navigate("/")}
          />
        </Box>
        <Box>
          <Button
            leftIcon={<ArrowBackIcon />}
            variant="ghost"
            color="#2563eb"
            onClick={() => navigate("/")}
          >
            Home
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default AdminNavbar;
