import { ChakraProvider } from "@chakra-ui/react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Requestlist from "./pages/Requestlist";

function App() {
  return (
    <>
      <BrowserRouter>
        <ChakraProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/requestlist" element={<Requestlist />} />
          </Routes>
        </ChakraProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
