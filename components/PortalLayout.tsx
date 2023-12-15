// components/PortalLayout.tsx

import React from "react";
import { SideDrawer } from "./SideDrawer";
import { Alert, AlertIcon, Box, CloseButton } from "@chakra-ui/react";

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  const [showAlert, setShowAlert] = React.useState(true); // State to control the alert visibility

  return (
    <div className="flex h-screen">
      <SideDrawer />
      <div className="flex-1 p-6">
        {showAlert && (
          <Alert status="info" mb={4}>
            <AlertIcon />
            <Box flex="1">
              <p>
                You are viewing a preview with fake data. To access full
                features, please
                <strong> sign up</strong> or <strong>log in</strong>.
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
