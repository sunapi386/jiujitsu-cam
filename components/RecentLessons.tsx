import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  Spacer,
} from "@chakra-ui/react";

const lessonsMockData = [
  {
    id: 1,
    title: "Guard Basics",
    description: "Introduction to Guard position and techniques",
    date: "2023-01-15",
    imageUrl: "/path/to/guard-basics.jpg", // Replace with actual image path
  },
  {
    id: 2,
    title: "Armbar Techniques",
    description: "Mastering the Armbar from various positions",
    date: "2023-01-22",
    imageUrl: "/path/to/armbar-techniques.jpg", // Replace with actual image path
  },
  // Add more lessons as needed
];

const RecentLessons = () => {
  return (
    <Box p={4} bg="white" boxShadow="md">
      <Heading mb={4}>Recent Lessons</Heading>
      <VStack spacing={4} align="stretch">
        {lessonsMockData.map((lesson) => (
          <HStack
            key={lesson.id}
            p={3}
            borderWidth="1px"
            borderRadius="lg"
            spacing={4}
          >
            <Image
              boxSize="100px"
              objectFit="cover"
              src={lesson.imageUrl}
              alt={lesson.title}
            />
            <VStack align="start">
              <Heading size="md">{lesson.title}</Heading>
              <Text>{lesson.description}</Text>
              <Text fontSize="sm" color="gray.500">
                Date: {lesson.date}
              </Text>
            </VStack>
            <Spacer />
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};

export default RecentLessons;
