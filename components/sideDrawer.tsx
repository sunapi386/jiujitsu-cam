import React, { useState } from "react";
import Link from "next/link"; // Import Link for navigation
import {
  AdjustmentsHorizontalIcon,
  VideoCameraIcon,
  UsersIcon,
  BookOpenIcon,
  Cog6ToothIcon,
  LightBulbIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { Text } from "@chakra-ui/react";
import { MdAccountBox } from "react-icons/md";
import { GiMirrorMirror } from "react-icons/gi";
import { IoLibraryOutline } from "react-icons/io5";
import { HomeIcon } from "@heroicons/react/24/outline";
import { TbLogout } from "react-icons/tb";
import { FaClipboardList } from "react-icons/fa";
import { HiOutlineDesktopComputer } from "react-icons/hi";

interface SidebarSubItemProps {
  name: string;
  pos?: "top" | "mid" | "bot";
}

const SubItem: React.FC<SidebarSubItemProps> = ({ name: label, pos }) => {
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
  href: string;
  icon?: React.ElementType;
  name: string;
}

const MenuIconItem: React.FC<SidebarMenuIconItemProps> = ({
  href,
  icon: Icon,
  name,
}) => {
  return (
    <Link href={href} passHref>
      <li className="mt-1 list-none flex items-center rounded-[9px] text-gray-900 py-[4px] pl-3 cursor-pointer hover:bg-[#F7F7F8]">
        {Icon && (
          <span className="flex-shrink-0">
            <Icon className="h-5 w-5 text-gray-700" />
          </span>
        )}
        <span className="ml-[3px] mr-[6px]">{name}</span>
      </li>
    </Link>
  );
};

const sidebarItems: SidebarMenuIconItemProps[] = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  {
    name: "Live Analysis",
    href: "/v",
    icon: VideoCameraIcon,
  },
  {
    name: "Technique Library",
    href: "/library",
    icon: ChartBarIcon,
  },
  {
    name: "Session Insights & AI Analysis",
    href: "/analysis",
    icon: LightBulbIcon,
  },
  {
    name: "Learning Modules",
    href: "/modules",
    icon: HiOutlineDesktopComputer,
  },
];

export const SideDrawer: React.FC = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  return (
    <>
      {isSidebarVisible ? (
        <div
          className="bg-white flex flex-col text-[#1a2b3b] p-[18px] rounded-lg relative w-64"
          style={{ boxShadow: "inset -1px 0 0 #fff" }}
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            BJJ Ace
          </Text>
          <ul className="mb-auto list-none">
            <ul className="mb-auto list-none">
              {sidebarItems.map(({ name, href, icon: UIcon }) => (
                <MenuIconItem key={name} icon={UIcon} name={name} href={href} />
              ))}
            </ul>
          </ul>
          <ul className="flex flex-col mb-[10px]">
            <hr className="border-[#e8e8ed] w-full" />
            <li className="mt-1 list-none flex items-center rounded-[9px] text-gray-900 py-[2px]">
              <MdAccountBox className="h-4 w-4 text-gray-700" />
              <p className="ml-[4px] mr-[6px] flex-shrink-0">User</p>
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
        <button
          onClick={() => setIsSidebarVisible(true)}
          className="bg-gray-600 text-white p-3 rounded-full fixed bottom-4 left-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <AdjustmentsHorizontalIcon className="h-5 w-5" />
        </button>
      )}
    </>
  );
};
