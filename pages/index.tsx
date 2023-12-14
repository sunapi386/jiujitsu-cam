// pages/index.tsx
import BenefitCard from "@/components/benefitCard";
import generateMeetLink from "@/utils/randomLink";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  VStack,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";

const Home = () => {
  const bgColor = useColorModeValue("gray.50", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.100");

  return (
    <>
      <Head>
        <title>BJJ Ace | AI-Enhanced Martial Arts Mastery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box as="main" bg={bgColor}>
        {/* Hero Section */}
        <Container maxW="container.xl" py="20">
          <VStack spacing="5" textAlign="center">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.15,
                ease: [0.165, 0.84, 0.44, 1],
              }}
              className="relative md:ml-[-10px] md:mb-[37px] font-extrabold text-[16vw] md:text-[130px] font-inter text-[#1E2B3A] leading-[0.9] tracking-[-2px] z-[100]"
            >
              Improve Jiujitsu <br />
              <span className="text-[#407BBF]"></span>
              <span className="font-inter text-[#407BBF]"> with AI</span>
            </motion.h1>
            <Link href={`/dashboard`}>
              <Button size="lg" colorScheme="blue">
                Try it out
              </Button>
            </Link>
          </VStack>
        </Container>

        {/* Features Section */}

        <Container maxW="container.xl" py="20">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {/* Feature 1 */}
            <BenefitCard
              title="Real-time Feedback"
              description="On your techniques from computer vision analysis."
            />

            {/* Feature 2 */}
            <BenefitCard
              title="Personalized Training"
              description="Receive tailored training recommendations based on your performance."
            />

            {/* Feature 3 */}
            <BenefitCard
              title="AI Analysis Tools"
              description="Analyze competitor videos and see summaries of what techniques they use."
            />
          </SimpleGrid>
        </Container>

        <Box bg="blue.600" color="white" py="20">
          <Container maxW="container.xl">
            <VStack spacing="4" textAlign="center">
              <Heading size="lg">
                Discover the AI Advantage for Jiujitsu Training
              </Heading>
              <Text fontSize="xl" color="white">
                Tools to help coaches and students to improve techniques.
              </Text>
              {/* <Button size="lg" variant="outline" colorScheme="white">
                Join Waitlist
              </Button> */}
            </VStack>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Home;
