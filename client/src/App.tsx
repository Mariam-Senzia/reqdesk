import "./App.css";
import { ChakraProvider, Text } from "@chakra-ui/react";

function App() {
  return (
    <>
      <ChakraProvider>
        <Text>Hello</Text>
      </ChakraProvider>
    </>
  );
}

export default App;
