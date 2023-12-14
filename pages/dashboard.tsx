"use client";
import React, { useState } from "react";
import {
  Spinner,
  Text,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { SideDrawer } from "@/components/sideDrawer";
import Statistics from "@/components/Statistics";

function Dashboard() {
  const [isLoading, setLoading] = useState(true);

  // Simulate loading state for demo purposes
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideDrawer />
      <div className="flex-1 p-6">
        {isLoading ? (
          <Spinner size="xl" />
        ) : (
          <Tabs variant="enclosed" isFitted>
            <TabList mb="1em">
              <Tab>Statistics</Tab>
              <Tab>Pose Analysis</Tab>
              <Tab>Recent Lessons</Tab>
              <Tab>Community Feed</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Text fontSize="xl">Your Jiu-Jitsu Statistics</Text>
                {/* Mockup content for Jiu-Jitsu statistics */}
                <Box p={4} bg="white" boxShadow="md">
                  {/* Placeholder content */}
                  <Text>Statistics Of Your Training</Text>
                  <Statistics />
                </Box>
              </TabPanel>
              <TabPanel>
                <Text fontSize="xl">Pose Analysis</Text>
                {/* Mockup content for Pose Analysis */}
                <Box p={4} bg="white" boxShadow="md">
                  {/* Placeholder content */}
                  <Text>Pose Analysis Content Goes Here</Text>
                </Box>
              </TabPanel>
              <TabPanel>
                <Text fontSize="xl">Recent Lessons</Text>
                {/* Mockup content for Recent Lessons */}
                <Box p={4} bg="white" boxShadow="md">
                  {/* Placeholder content */}
                  <Text>Recent Lessons Content Goes Here</Text>
                </Box>
              </TabPanel>
              <TabPanel>
                <Text fontSize="xl">Community Feed</Text>
                {/* Mockup content for Community Feed */}
                <Box p={4} bg="white" boxShadow="md">
                  {/* Placeholder content */}
                  <Text>Community Feed Content Goes Here</Text>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
