import React from "react";
import {
  Box,
  Heading,
  Text,
  Image,
  VStack,
  HStack,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { FaHeart, FaComment } from "react-icons/fa";

const feedMockData = [
  {
    id: 1,
    userName: "JohnDoe123",
    postTime: "2 hours ago",
    content: "Just learned a new armbar technique!",
    imageUrl: "/poses/48-1.pose.jpg",
    likes: 12,
    comments: 3,
  },
  {
    id: 2,
    userName: "MartialArtist42",
    postTime: "1 day ago",
    content: "Tips for improving your guard game",
    imageUrl: "/poses/125-1.pose.jpg",
    likes: 20,
    comments: 5,
  },
  // Add more posts as needed
];

const CommunityFeed = () => {
  return (
    <Box p={4} bg="white" boxShadow="md">
      <Heading mb={4}>Community Feed</Heading>
      <VStack spacing={4} align="stretch">
        {feedMockData.map((post) => (
          <Box key={post.id} p={3} borderWidth="1px" borderRadius="lg">
            <HStack mb={2}>
              <Text fontWeight="bold">{post.userName}</Text>
              <Text color="gray.500">- {post.postTime}</Text>
            </HStack>
            <Text mb={2}>{post.content}</Text>
            <Image objectFit="none" src={post.imageUrl} alt="Post image" />
            <HStack mt={2}>
              <IconButton
                aria-label="like"
                icon={<FaHeart />}
                size="sm"
                colorScheme="red"
                variant="outline"
              />
              <Text>{post.likes}</Text>
              <IconButton
                aria-label="comment"
                icon={<FaComment />}
                size="sm"
                colorScheme="blue"
                variant="outline"
              />
              <Text>{post.comments}</Text>
              <Spacer />
              {/* Additional actions or information could go here */}
            </HStack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default CommunityFeed;
