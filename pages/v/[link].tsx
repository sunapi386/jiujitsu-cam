import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const MeetLinkPage: React.FC = () => {
  const CameraBox = dynamic(() => import("@/components/camera"), {
    ssr: false,
  });

  const router = useRouter();
  const { link } = router.query;
  if (!link || typeof link !== "string") {
    return <div>404: {link}</div>;
  }

  return <CameraBox link={link} />;
};

export default MeetLinkPage;
