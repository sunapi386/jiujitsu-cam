import React, { useState } from "react";
import {
  WindowIcon,
  HomeIcon,
  VideoCameraIcon,
  QuestionMarkCircleIcon,
  UsersIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import {
  List,
  ListItem,
  ListIcon,
  Text,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";
import { MdAccountBox, MdSettings } from "react-icons/md";

interface SidebarSubItemProps {
  label: string;
  pos?: "top" | "mid" | "bot";
}

const SubItem: React.FC<SidebarSubItemProps> = ({ label, pos }) => {
  let vbar;
  if (pos === "top") {
    vbar = (
      <div className="absolute w-[1px] bg-[#e8e8ed] left-[8px] top-[9px] bottom-0"></div>
    );
  } else if (pos === "mid") {
    vbar = (
      <div className="absolute w-[1px] bg-[#e8e8ed] left-[8px] top-0 bottom-0"></div>
    );
  } else {
    vbar = (
      <div className="absolute w-[1px] bg-[#e8e8ed] left-[8px] top-0 bottom-[9px]"></div>
    );
  }

  return (
    <li className="mt-1 list-none flex items-center rounded-[3px] relative bg-white text-gray-600 w-full m-0 cursor-pointer hover:bg-[#F7F7F8] focus:outline-none py-[4px]">
      <div className="bg-[#e8e8ed] pointer-events-none absolute left-[7px] z-10 top-1/2 h-[3px] w-[3px] rounded-full transform -translate-y-1/2"></div>
      <div className="text-gray-600 truncate pr-4 pl-[18px]">{label}</div>
    </li>
  );
};

interface SidebarMenuIconItemProps {
  icon: React.ReactNode;
  label: string;
}

const MenuIconItem: React.FC<SidebarMenuIconItemProps> = ({ icon, label }) => {
  return (
    <li className="mt-1 list-none flex items-center rounded-[9px] text-gray-900 py-[4px]">
      {icon}
      <p className="ml-[3px] mr-[6px]">{label}</p>
    </li>
  );
};

const PlaceholderIcon: React.FC = () => {
  return (
    <span className="h-4 w-4 bg-gray-300 rounded"></span> // Just a placeholder, replace with real icons.
  );
};
export const SideDrawer: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <>
      {isSidebarVisible ? (
        <div
          className="bg-white flex flex-col text-[#1a2b3b] p-[18px] rounded-lg relative w-64"
          style={{ boxShadow: "inset -1px 0 0 #fff" }}
        >
          <Text fontSize="xl">BJJ Ace</Text>
          <ul className="mb-auto list-none">
            <MenuIconItem
              icon={<VideoCameraIcon className="h-4 w-4 text-gray-700" />}
              label="Movement Detection"
            />
            <SubItem pos="top" label="Real-time Analysis" />
            <SubItem label="Historical Data" />

            <MenuIconItem
              icon={<VideoCameraIcon className="h-4 w-4 text-gray-700" />}
              label="Training Data"
            />
            <SubItem pos="top" label="Upload Videos" />
            <SubItem label="Annotated Movements" />

            <MenuIconItem
              icon={<VideoCameraIcon className="h-4 w-4 text-gray-700" />}
              label="Practice Reviews"
            />
            <SubItem pos="top" label="Recent Sessions" />
            <SubItem label="Feedback & Tips" />

            <MenuIconItem
              icon={
                <QuestionMarkCircleIcon className="h-4 w-4 text-gray-700" />
              }
              label="Technique Library"
            />
            <SubItem pos="top" label="Common Techniques" />
            <SubItem label="User Submissions" />

            <MenuIconItem
              icon={<UsersIcon className="h-4 w-4 text-gray-700" />}
              label="Community"
            />
            <SubItem pos="top" label="Discussion Forums" />
            <SubItem label="Expert Tips" />

            <MenuIconItem
              icon={<BookOpenIcon className="h-4 w-4 text-gray-700" />}
              label="Resources"
            />
            <SubItem pos="top" label="Learning Modules" />
            <SubItem label="Tutorials" />

            <MenuIconItem
              icon={<Cog6ToothIcon className="h-4 w-4 text-gray-700" />}
              label="Settings"
            />
            <SubItem pos="top" label="Camera Setup" />
            <SubItem label="Profile & Preferences" />

            {/* END */}
          </ul>
          <ul className="flex flex-col mb-[10px]">
            <hr className="border-[#e8e8ed] w-full" />
            <li className="mt-1 list-none flex items-center rounded-[9px] text-gray-900 py-[2px]">
              <MdAccountBox className="h-4 w-4 text-gray-700" />
              <p className="ml-[4px] mr-[6px] flex-shrink-0">Jason Sun</p>
              <div className="ml-auto">
                <AdjustmentsHorizontalIcon
                  className="h-4 w-4 text-gray-700 cursor-pointer"
                  onClick={() => setIsSidebarVisible(false)}
                />
              </div>
            </li>
          </ul>
        </div>
      ) : (
        // Floating button to show the sidebar
        <button
          onClick={() => setIsSidebarVisible(true)}
          className="bg-blue-600 text-white p-3 rounded-full fixed bottom-4 left-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <WindowIcon className="h-5 w-5" />
        </button>
      )}
    </>
  );
};
