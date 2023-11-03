import { Stack, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";

interface BenefitCardProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const BenefitCard: React.FC<BenefitCardProps> = ({
  title,
  description,
  imageUrl,
}) => {
  return (
    <Stack bg="white" p="6" borderRadius="lg" boxShadow="lg" spacing="4">
      {imageUrl && <Image src={imageUrl} alt={title} />}
      <Heading size="md">{title}</Heading>
      <Text>{description}</Text>
    </Stack>
  );
};

export default BenefitCard;
