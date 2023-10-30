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

  return (
    <div>
      <h1>Meet Link Page</h1>
      <p>You are in the meet link: {link}</p>
      <CameraBox link={link} />
    </div>
  );
};

export default MeetLinkPage;
