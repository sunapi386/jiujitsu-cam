// components/PortalLayout.tsx

import React from "react";
import { SideDrawer } from "./SideDrawer";

const PortalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <SideDrawer />
      <div className="flex-1 p-6">
        <main>{children}</main>
      </div>
    </div>
  );
};

export default PortalLayout;
