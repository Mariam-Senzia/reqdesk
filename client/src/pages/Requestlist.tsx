import {
  Box,
  Container,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Navbar from "../components/home/Navbar";

const Requestlist = () => {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <Box py="20px">
          <Box marginBottom="30px">
            <Heading color="#1f2937" size="lg">
              Request List
            </Heading>
            <Text color="#64748b">
              Manage and update incoming requests from the dashboard.
            </Text>
          </Box>

          <Box>
            <TableContainer
              bgColor="#fff"
              border="1px solid #e2e8f0"
              boxShadow="0 2px 20px rgba(0,0,0,0.03)"
              borderRadius="10px"
            >
              <Table variant="simple">
                <Thead bg="#f1f5f9">
                  <Tr>
                    <Th>To convert</Th>
                    <Th>into</Th>
                    <Th isNumeric>multiply by</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>inches</Td>
                    <Td>millimetres (mm)</Td>
                    <Td isNumeric>25.4</Td>
                  </Tr>
                  <Tr>
                    <Td>feet</Td>
                    <Td>centimetres (cm)</Td>
                    <Td isNumeric>30.48</Td>
                  </Tr>
                  <Tr>
                    <Td>yards</Td>
                    <Td>metres (m)</Td>
                    <Td isNumeric>0.91444</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Requestlist;
