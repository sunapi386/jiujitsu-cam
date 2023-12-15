"use client";
import React, { useState } from "react";
import { Spinner, Box, Heading, Text, Button } from "@chakra-ui/react";
import PoseAnalysis from "@/components/PoseAnalysis";
import PortalLayout from "../../components/PortalLayout";

const Poses = () => {
  const [isLoading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleUploadPose = () => {
    // Logic to handle pose upload
  };

  return (
    <PortalLayout>
      <Box className="flex-1 p-6">
        {isLoading ? (
          <Box className="flex justify-center items-center h-full">
            <Spinner size="xl" />
          </Box>
        ) : (
          <>
            <Heading mb={4}>Available Poses</Heading>
            <Text mb={6}>
              Explore a wide range of poses recognized by our advanced computer
              vision algorithm. Enhance your training experience by
              understanding key aspects of each pose.
            </Text>
            <PoseAnalysis />
            <Box mt={6}>
              <Heading size="md" mb={2}>
                Custom Pose Submission
              </Heading>
              <Text mb={4}>
                Contribute to our pose library by uploading your own custom
                poses. High-quality submissions help improve recognition
                accuracy and enrich the training experience for all users. For
                optimal results, upload multiple images showcasing different
                angles of your pose.
              </Text>
              <Button onClick={handleUploadPose} colorScheme="blue" isDisabled>
                Upload Custom Pose
              </Button>
              <Text mt={2} fontSize="sm">
                Please log in!
              </Text>
            </Box>
          </>
        )}
      </Box>
    </PortalLayout>
  );
};

export default Poses;
