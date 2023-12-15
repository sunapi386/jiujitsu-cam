import React from "react";
import { Box, Image, Heading, Text, Divider } from "@chakra-ui/react";

const PoseAnalysis = ({}) => {
  const image1 = `/poses/27-1.pose.jpg`;
  const image2 = "/poses/27-1.mask.jpg";
  return (
    <Box>
      <Heading mb={4}>Pose Analysis</Heading>
      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
      >
        <Box p={2}>
          <Image src={image1} alt="Pose 1" boxSize="300px" objectFit="cover" />
          <Text mt={2}>
            Pose 1 Analysis: <i>Back Hooks</i>
          </Text>
        </Box>
        <Divider
          orientation="vertical"
          mx={4}
          height="auto"
          alignSelf="center"
        />
        <Box p={2}>
          <Image src={image2} alt="Pose 2" boxSize="300px" objectFit="cover" />
          <Text mt={2}>
            Pose 2 Analysis: <i>Grips</i>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default PoseAnalysis;
