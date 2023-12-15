"use client";
import React, { useState } from "react";
import { Spinner, Box } from "@chakra-ui/react";
import RecentLessons from "@/components/RecentLessons";

import PortalLayout from "../../components/PortalLayout";

const PortalIndex = () => {
  const [isLoading, setLoading] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PortalLayout>
      <div className="flex h-screen bg-gray-100">
        <div className="flex-1 p-6">
          {isLoading ? (
            <Box className="flex justify-center items-center h-full">
              <Spinner size="xl" />
            </Box>
          ) : (
            <RecentLessons />
          )}
        </div>
      </div>
    </PortalLayout>
  );
};

export default PortalIndex;
