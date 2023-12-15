"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";

import generateMeetLink from "@/utils/randomLink";
import { Flex, Spinner, Text } from "@chakra-ui/react";

function DemoRedirect() {
  const router = useRouter();

  const link = `/portal/meet/${generateMeetLink()}`;

  useEffect(() => {
    router.replace(link);
  }, [router, link]);

  return (
    <Flex
      height="100vh"
      width="100vw"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Text fontSize="xl" mb={4}>
        Redirecting to your demo...
      </Text>
      <Spinner size="xl" />
    </Flex>
  );
}

export default DemoRedirect;
