import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  List,
  ListIcon,
  ListItem,
  Radio,
  RadioGroup,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const Hero = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    request_type: "",
    priority: "",
    message: "",
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    fetch("https://reqdesk.onrender.com/api/v1/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setIsVisible(true);
        setFormData({
          name: "",
          email: "",
          company: "",
          request_type: "",
          priority: "",
          message: "",
        });
        setTimeout(() => {
          setIsVisible(false);
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong, please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      <Container maxW="container.xl">
        <Box
          minH="90vh"
          display={{ base: "", lg: "flex" }}
          justifyContent="space-between"
          alignItems="center"
          py={{ base: "35px", lg: "0" }}
        >
          <Box
            flex={1}
            alignSelf="center"
            display="flex"
            flexDirection="column"
            alignItems={{ base: "flex-start", md: "center", lg: "flex-start" }}
            textAlign={{ base: "left", md: "center", lg: "left" }}
          >
            <Heading
              size="2xl"
              color="#1f2937"
              width={{ base: "100%", lg: "80%" }}
            >
              Submit requests.
            </Heading>
            <Heading
              size="2xl"
              color="#1f2937"
              marginBottom="15px"
              width={{ base: "100%", lg: "80%" }}
            >
              Manage with ease.
            </Heading>
            <Text
              marginBottom="30px"
              fontSize="lg"
              color="#1f2937"
              width={{ base: "100%", md: "80%", lg: "70%" }}
            >
              Reqdesk gives users a simple way to submit requests and gives
              admins the tools to track, prioritize and resolve them all in one
              place.
            </Text>
            <List spacing={3} color="#1f2937" fontSize="lg">
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="#2563eb" />
                Simple request submission for users
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="#2563eb" />
                Admin dashboard to review and resolve requests
              </ListItem>
              <ListItem>
                <ListIcon as={CheckCircleIcon} color="#2563eb" />
                Secure and reliable
              </ListItem>
            </List>

            <HStack spacing="36px" marginTop="40px">
              <Box>
                <Heading size="lg" color="#2563eb">
                  500+
                </Heading>
                <Text color="#64748b">Requests handled</Text>
              </Box>
              <Box>
                <Heading size="lg" color="#2563eb">
                  98%
                </Heading>
                <Text fontSize="sm" color="#64748b">
                  Resolution rate
                </Text>
              </Box>
              <Box>
                <Heading size="lg" color="#2563eb">
                  24h
                </Heading>
                <Text fontSize="sm" color="#64748b">
                  Average response
                </Text>
              </Box>
            </HStack>
          </Box>

          <Box
            flex={1}
            display="flex"
            justifyContent={{ base: "", md: "center", lg: "flex-end" }}
            marginTop={{ base: "35px", lg: "0" }}
          >
            <Box
              as="form"
              bg="#ffffff"
              width={{ base: "100%", md: "80%" }}
              padding={{ base: "20px", md: "30px" }}
              borderRadius="10px"
              boxShadow="0px 4px 20px rgba(0, 0, 0, 0.08)"
              onSubmit={handleSubmit}
              sx={{
                ".chakra-form__required-indicator": { color: "#111827" },
              }}
            >
              <Heading size="md" color="#111827" marginBottom="4px">
                Let's hear from you
              </Heading>
              <Text fontSize="sm" color="#64748b" marginBottom="20px">
                Submit your request and our team will review and respond
                promptly.
              </Text>
              <FormControl isRequired marginBottom="20px">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired marginBottom="20px">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="example@mail.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired marginBottom="20px">
                <FormLabel>Company</FormLabel>
                <Input
                  type="text"
                  placeholder="ABC Ltd"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired marginBottom="20px">
                <FormLabel>Request Type</FormLabel>
                <Select
                  placeholder="Select request type"
                  name="request_type"
                  value={formData.request_type}
                  onChange={handleInputChange}
                >
                  <option value="Bug">Bug</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="General Feedback">General Feedback</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <FormControl isRequired marginBottom="20px">
                <FormLabel>Priority</FormLabel>
                <RadioGroup
                  value={formData.priority}
                  onChange={(value) => {
                    setFormData({ ...formData, priority: value });
                  }}
                >
                  <HStack spacing="24px">
                    <Radio colorScheme="green" value="Low">
                      Low
                    </Radio>
                    <Radio colorScheme="yellow" value="Medium">
                      Medium
                    </Radio>
                    <Radio colorScheme="red" value="High">
                      High
                    </Radio>
                  </HStack>
                </RadioGroup>
              </FormControl>
              <FormControl isRequired marginBottom="25px">
                <FormLabel>Message</FormLabel>
                <Textarea
                  placeholder="Enter your message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                ></Textarea>
              </FormControl>

              <Button
                type="submit"
                bg="#2563eb"
                color="#fff"
                _hover={{ bg: "#1d4ed8" }}
                width="100%"
                isLoading={isSubmitting}
                loadingText={"Submitting.."}
              >
                Submit Request
              </Button>
            </Box>
          </Box>
        </Box>

        {isVisible && (
          <Box position="fixed" bottom="20px" left="20px" zIndex={10}>
            <Alert status="success">
              <AlertIcon /> Your request was submitted successfully
            </Alert>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Hero;
