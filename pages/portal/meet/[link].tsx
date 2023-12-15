import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Box, Text, useClipboard } from "@chakra-ui/react";
import PortalLayout from "@/components/PortalLayout";
const name = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "jiujitsu.cam";

const MeetLinkPage: React.FC = () => {
  const CameraBox = dynamic(() => import("@/components/camera"), {
    ssr: false,
  });

  const router = useRouter();
  const { link } = router.query;
  const { hasCopied, onCopy } = useClipboard(`https://${name}/meet/${link}`);

  if (!link || typeof link !== "string") {
    return <div>404: {link}</div>;
  }

  return (
    <PortalLayout>
      <Box mb={4} p={3} bg="blue.100" borderRadius="md">
        <Text fontSize="md">
          This is your unique session link. Share it with others to allow them
          to see your moves in real time.
          <Text
            as="span"
            fontWeight="bold"
            cursor="pointer"
            ml={2}
            onClick={onCopy}
          >
            {hasCopied ? "Link Copied!" : "Copy Link"}
          </Text>
        </Text>
      </Box>
      <CameraBox link={link} />
    </PortalLayout>
  );
};

export default MeetLinkPage;
