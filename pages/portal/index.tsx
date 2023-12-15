"use client";
import React, { useState } from "react";
import { Spinner, Box } from "@chakra-ui/react";
import CommunityFeed from "@/components/CommunityFeed";

import PortalLayout from "../../components/PortalLayout";

const PortalIndex = () => {
  const [isLoading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PortalLayout>
      <div className="flex h-screen">
        <div className="flex-1 p-6">
          {isLoading ? (
            <Box className="flex justify-center items-center h-full">
              <Spinner size="xl" />
            </Box>
          ) : (
            <CommunityFeed />
          )}
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalIndex;
