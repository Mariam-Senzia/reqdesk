import { Box } from "@chakra-ui/react";
import Navbar from "../components/home/Navbar";
import Requestform from "../components/home/Hero";

const Home = () => {
  return (
    <>
      <Box
        bgGradient={{
          base: "linear(180deg, #e8f0fe, #dbeafe, #eff6ff)",
          lg: "linear(135deg, #e8f0fe, #dbeafe, #eff6ff)",
        }}
        minH="100vh"
      >
        <Navbar />
        <Requestform />
      </Box>
    </>
  );
};

export default Home;
