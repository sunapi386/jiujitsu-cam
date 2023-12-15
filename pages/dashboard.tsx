"use client";
import React, { useState } from "react";
import {
  Spinner,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { SideDrawer } from "@/components/sideDrawer";
import Statistics from "@/components/Statistics";
import PoseAnalysis from "@/components/PoseAnalysis";
import RecentLessons from "@/components/RecentLessons";
import CommunityFeed from "@/components/CommunityFeed";

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
                <Box p={4} bg="white" boxShadow="md">
                  <Statistics />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box p={4} bg="white" boxShadow="md">
                  <PoseAnalysis />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box p={4} bg="white" boxShadow="md">
                  <RecentLessons />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box p={4} bg="white" boxShadow="md">
                  <CommunityFeed />
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
