import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { SideDrawer } from "@/components/sideDrawer";

const MeetLinkPage: React.FC = () => {
  const CameraBox = dynamic(() => import("@/components/camera"), {
    ssr: false,
  });

  const router = useRouter();
  const { link } = router.query;
  if (!link || typeof link !== "string") {
    return <div>404: {link}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SideDrawer />
      <div className="flex-1 p-6">
        <CameraBox link={link} />
      </div>
    </div>
  );
};

export default MeetLinkPage;
