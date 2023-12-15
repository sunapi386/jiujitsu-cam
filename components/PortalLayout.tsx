// components/PortalLayout.tsx

import React from "react";
import { SideDrawer } from "./SideDrawer";
import { Alert, AlertIcon, Box, CloseButton } from "@chakra-ui/react";

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  const [showAlert, setShowAlert] = React.useState(true);

  return (
    <div className="flex h-screen">
      <SideDrawer />
      <div className="flex-1 p-6">
        {showAlert && (
          <Alert status="info" mb={4}>
            <AlertIcon />
            <Box flex="1">
              <p>
                You are viewing preview data. To access full features, please
                log in.
              </p>
            </Box>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => setShowAlert(false)}
            />
          </Alert>
        )}
        <main>{children}</main>
      </div>
    </div>
  );
};

export default PortalLayout;
