import { CheckCircleIcon } from "@chakra-ui/icons";
import {
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

const Hero = () => {
  return (
    <>
      <Container maxW="container.xl">
        <Box
          minH="85vh"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box flex={1} alignSelf="center">
            <Heading size="2xl" color="#1f2937" width="80%">
              Submit requests.
            </Heading>
            <Heading size="2xl" color="#1f2937" marginBottom="15px" width="80%">
              Manage with ease.
            </Heading>
            <Text marginBottom="30px" fontSize="lg" color="#1f2937" width="70%">
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

          <Box flex={1} display="flex" justifyContent="flex-end">
            <form
              style={{
                backgroundColor: "#fff",
                width: "80%",
                padding: "30px",
                borderRadius: "10px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
              }}
            >
              <Heading size="md" color="#111827" marginBottom="4px">
                Let's hear from you
              </Heading>
              <Text fontSize="sm" color="#64748b" marginBottom="20px">
                Submit your request and our team will review and respond
                promptly.
              </Text>
              <FormControl marginBottom="20px">
                <FormLabel>Name</FormLabel>
                <Input placeholder="Enter your full name" />
              </FormControl>
              <FormControl marginBottom="20px">
                <FormLabel>Email</FormLabel>
                <Input placeholder="example@mail.com" />
              </FormControl>
              <FormControl marginBottom="20px">
                <FormLabel>Company</FormLabel>
                <Input placeholder="ABC Ltd" />
              </FormControl>
              <FormControl marginBottom="20px">
                <FormLabel>Request Type</FormLabel>
                <Select placeholder="Select request type">
                  <option value="Bug">Bug</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="General Feedback">General Feedback</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <FormControl marginBottom="20px">
                <FormLabel>Priority</FormLabel>
                <RadioGroup>
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
              <FormControl marginBottom="25px">
                <FormLabel>Message</FormLabel>
                <Textarea></Textarea>
              </FormControl>

              <Button
                bg="#2563eb"
                color="#fff"
                _hover={{ bg: "#1d4ed8" }}
                width="100%"
              >
                Submit Request
              </Button>
            </form>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Hero;
