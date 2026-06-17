import {
  Alert,
  AlertIcon,
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
  FormLabel,
  HStack,
  Heading,
  Input,
  Select,
  Skeleton,
  Stack,
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
import { FaSlidersH } from "react-icons/fa";

type Request = {
  id: number;
  name: string;
  email: string;
  company: string;
  request_type: string;
  priority: "Low" | "Medium" | "High";
  status: "New" | "In Review" | "Resolved" | "Rejected";
  message: string;
  created_at: string;
};

const Requestlist = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef(null);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [newStatus, SetNewStatus] = useState<Request["status"] | "">("");
  const [isVisible, setIsVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAdmin") === "true"
  );
  const [pin, setPin] = useState("");

  useEffect(() => {
    fetch("https://reqdesk.onrender.com/api/v1/requests")
      .then((resp) => resp.json())
      .then((data) => {
        setRequests(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const priorityColor: Record<Request["priority"], string> = {
    Low: "green",
    Medium: "yellow",
    High: "red",
  };

  const statusColor: Record<Request["status"], string> = {
    New: "blue",
    "In Review": "purple",
    Resolved: "green",
    Rejected: "red",
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRequest) return;

    fetch(
      `https://reqdesk.onrender.com/api/v1/requests/${selectedRequest.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    )
      .then((resp) => resp.json())
      .then(() => {
        setIsVisible(true);
        setTimeout(() => {
          setIsVisible(false);
          SetNewStatus("");
        }, 2500);
        onClose();
        fetch("https://reqdesk.onrender.com/api/v1/requests")
          .then((resp) => resp.json())
          .then((data) => setRequests(data));
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong, please try again.");
      });
  };

  const filteredRequests = requests.filter((req) => {
    return (
      (statusFilter === "" || req.status === statusFilter) &&
      (priorityFilter === "" || req.priority === priorityFilter)
    );
  });

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === "1234") {
      setIsAuthenticated(true);
      localStorage.setItem("isAdmin", "true");
    } else {
      alert(" Incorrect Pin");
    }
  };

  if (!isAuthenticated) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="flex-start"
        pt={{ base: "30vh", md: "25vh" }}
        px={{ base: 5, md: 0 }}
        justifyContent="center"
        bgGradient={{
          base: "linear(180deg, #e8f0fe, #dbeafe, #eff6ff)",
          lg: "linear(135deg, #e8f0fe, #dbeafe, #eff6ff)",
        }}
      >
        <Box
          as="form"
          onSubmit={handlePinSubmit}
          bg="#fff"
          p={8}
          borderRadius="10px"
          boxShadow="0px 4px 20px rgba(0,0,0,0.06)"
        >
          <Heading size="md" mb={4}>
            Admin access
          </Heading>
          <Input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            mb={4}
          />
          <Button
            type="submit"
            bg="#2563eb"
            color="#fff"
            _hover={{ bg: "#1d4ed8" }}
            width="100%"
          >
            Continue
          </Button>
        </Box>
      </Box>
    );
  }

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

        <Box marginBottom="20px">
          <Stack direction={{ base: "column", md: "row" }} spacing={4}>
            <HStack color="#2563eb">
              <FaSlidersH />
              <Text fontWeight="500">Filters</Text>
            </HStack>
            <HStack spacing={3}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                placeholder="Status"
                maxW={{ base: "120px", md: "200px" }}
                color="#64748b"
              >
                <option value="New">New</option>
                <option value="In Review">In Review</option>
                <option value="Resolved">Resolved</option>
                <option value="Rejected">Rejected</option>
              </Select>
              <Select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                placeholder="Priority"
                maxW={{ base: "120px", md: "200px" }}
                color="#64748b"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Select>
              <Button
                variant="outline"
                color="#64748b"
                fontWeight="500"
                width="100%"
                onClick={() => {
                  setStatusFilter("");
                  setPriorityFilter("");
                }}
              >
                All Requests
              </Button>
            </HStack>
          </Stack>
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
                  {/* <Th>DATE</Th> */}
                  <Th>ACTION</Th>
                </Tr>
              </Thead>
              <Tbody>
                {isLoading ? (
                  Array(5)
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
                          </Td>
                          <Td>
                            <Skeleton height="20px" />
                          </Td>
                          {/* <Td>
                            <Skeleton height="20px" />
                          </Td> */}
                        </Tr>
                      );
                    })
                ) : (
                  <>
                    {filteredRequests.map((req, index) => {
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
                          {/* <Td>
                            {new Date(req.created_at).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </Td> */}
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
                    {filteredRequests.length === 0 && (
                      <Tr>
                        <Td
                          colSpan={8}
                          textAlign="center"
                          py={8}
                          color="#94a3b8"
                        >
                          No requests found matching your filters.
                        </Td>
                      </Tr>
                    )}
                  </>
                )}
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
            size={{ base: "full", md: "sm" }}
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
                    {selectedRequest && (
                      <Badge
                        colorScheme={priorityColor[selectedRequest.priority]}
                      >
                        {selectedRequest.priority}
                      </Badge>
                    )}
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
                    {selectedRequest && (
                      <Badge
                        variant="outline"
                        colorScheme={statusColor[selectedRequest.status]}
                      >
                        {selectedRequest.status}
                      </Badge>
                    )}
                  </HStack>
                  <Box as="form" onSubmit={handleSubmit}>
                    <FormLabel>Update Status</FormLabel>
                    <HStack pb={6}>
                      <Select
                        value={newStatus}
                        onChange={(e) =>
                          SetNewStatus(e.target.value as Request["status"])
                        }
                      >
                        <option value="New">New</option>
                        <option value="In Review">In Review</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                      </Select>
                      <Button
                        type="submit"
                        bg="#2563eb"
                        color="#fff"
                        _hover={{ bg: "#1d4ed8" }}
                        transition="all 0.3s ease"
                      >
                        Update
                      </Button>
                    </HStack>
                  </Box>

                  <Divider borderColor="#cbd5e1" />

                  <HStack justifyContent="space-between" py={5}>
                    <Heading size="sm" color="#374151">
                      Date
                    </Heading>
                    {selectedRequest && (
                      <Text>
                        {new Date(
                          selectedRequest?.created_at
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </Text>
                    )}
                  </HStack>
                </Box>
              </DrawerBody>

              <DrawerFooter>
                <Button variant="outline" mr={3} onClick={onClose}>
                  Cancel
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>

        {isVisible && (
          <Box position="fixed" bottom="20px" left="20px" zIndex={999}>
            <Alert status="success">
              <AlertIcon /> Your request was updated successfully
            </Alert>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Requestlist;
