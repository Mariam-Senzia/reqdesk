import {
  Badge,
  Box,
  Button,
  Heading,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AdminNavbar from "../components/reuestlist/AdminNavbar";

const Requestlist = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/requests")
      .then((resp) => resp.json())
      .then((data) => {
        setRequests(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <AdminNavbar />
      <Box py={4} px={{ base: 4, md: 6, lg: 10 }}>
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
                  <Th>USER </Th>
                  <Th>COMPANY</Th>
                  <Th>REQUEST TYPE</Th>
                  <Th>PRIORITY</Th>
                  <Th>MESSAGE</Th>
                  <Th>STATUS</Th>
                  <Th>DATE</Th>
                  <Th>ACTION</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading
                  ? Array(5)
                      .fill(0)
                      .map((_, index) => {
                        return (
                          <Tr key={index}>
                            <Td>
                              <Skeleton height="40px" />
                            </Td>
                            <Td>
                              <Skeleton height="20px" />
                            </Td>
                            <Td>
                              <Skeleton height="20px" />
                            </Td>
                            <Td>
                              <Skeleton height="20px" />
                            </Td>
                            <Td>
                              <Skeleton height="20px" />
                            </Td>
                            <Td>
                              <Skeleton height="20px" />
                            </Td>{" "}
                            <Td>
                              <Skeleton height="20px" />
                            </Td>{" "}
                            <Td>
                              <Skeleton height="20px" />
                            </Td>
                          </Tr>
                        );
                      })
                  : requests.map((req, index) => {
                      const priorityColor = {
                        Low: "green",
                        Medium: "yellow",
                        High: "red",
                      };

                      const statusColor = {
                        New: "blue",
                        "In Review": "purple",
                        Resolved: "green",
                        Rejected: "red",
                      };
                      return (
                        <Tr key={index} color="#64748b">
                          <Td>
                            <VStack alignItems="left">
                              <Text>{req.name}</Text>
                              <Text>{req.email}</Text>
                            </VStack>
                          </Td>

                          <Td>{req.company}</Td>
                          <Td>{req.request_type}</Td>
                          <Td>
                            <Badge colorScheme={priorityColor[req.priority]}>
                              {req.priority}
                            </Badge>
                          </Td>
                          <Td maxW="300px" isTruncated>
                            {req.message}
                          </Td>
                          <Td>
                            <Badge
                              variant="outline"
                              colorScheme={statusColor[req.status]}
                            >
                              {req.status}
                            </Badge>
                          </Td>
                          <Td>
                            {new Date(req.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </Td>
                          <Td>
                            <Button
                              bg="#2563eb"
                              color="#fff"
                              _hover={{ bg: "#1d4ed8" }}
                              transition="all 0.3s ease"
                            >
                              Manage Request
                            </Button>
                          </Td>
                        </Tr>
                      );
                    })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Requestlist;
