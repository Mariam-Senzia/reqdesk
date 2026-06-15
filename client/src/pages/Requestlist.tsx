import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
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
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import AdminNavbar from "../components/reuestlist/AdminNavbar";

const Requestlist = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/requests")
      .then((resp) => resp.json())
      .then((data) => {
        setRequests(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
                              ref={btnRef}
                              onClick={() => {
                                setSelectedRequest(req), onOpen();
                              }}
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

        <Box>
          <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Request details</DrawerHeader>

              <DrawerBody>
                <Box>
                  <HStack justifyContent="space-between" py={5}>
                    <Heading size="sm" color="#374151">
                      Name
                    </Heading>
                    <Text color="#374151">{selectedRequest?.name}</Text>
                  </HStack>
                  <Divider borderColor="#cbd5e1" />
                  <HStack justifyContent="space-between" py={5}>
                    <Heading size="sm" color="#374151">
                      Email
                    </Heading>
                    <Text color="#374151">{selectedRequest?.email}</Text>
                  </HStack>
                  <Divider borderColor="#cbd5e1" />

                  <HStack justifyContent="space-between" py={5}>
                    <Heading size="sm" color="#374151">
                      Company
                    </Heading>
                    <Text color="#374151">{selectedRequest?.company}</Text>
                  </HStack>
                  <Divider borderColor="#cbd5e1" />

                  <HStack justifyContent="space-between" py={5}>
                    <Heading size="sm" color="#374151">
                      Request type
                    </Heading>
                    <Text>{selectedRequest?.request_type}</Text>
                  </HStack>
                  <Divider borderColor="#cbd5e1" />

                  <HStack justifyContent="space-between" py={5}>
                    <Heading size="sm" color="#374151">
                      Priority
                    </Heading>
                    <Badge
                      colorScheme={priorityColor[selectedRequest.priority]}
                    >
                      {selectedRequest.priority}
                    </Badge>
                  </HStack>
                  <Divider borderColor="#cbd5e1" />

                  <VStack alignItems="left" py={5}>
                    <Heading size="sm" color="#374151">
                      Message
                    </Heading>
                    <Text>{selectedRequest?.message}</Text>
                  </VStack>
                  <Divider borderColor="#cbd5e1" />

                  <HStack justifyContent="space-between" py={5}>
                    <Heading size="sm" color="#374151">
                      Status
                    </Heading>
                    <Badge
                      variant="outline"
                      colorScheme={statusColor[selectedRequest?.status]}
                    >
                      {selectedRequest?.status}
                    </Badge>
                  </HStack>
                  <Divider borderColor="#cbd5e1" />

                  <HStack justifyContent="space-between" py={5}>
                    <Heading size="sm" color="#374151">
                      Date
                    </Heading>
                    <Text>
                      {new Date(selectedRequest?.created_at).toLocaleDateString(
                        "en-GB",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </Text>
                  </HStack>
                </Box>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
                <Button colorScheme="blue">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default Requestlist;
