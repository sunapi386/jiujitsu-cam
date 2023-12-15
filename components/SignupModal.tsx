import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Text,
} from "@chakra-ui/react";

const SignupModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [email, setEmail] = useState("");

  const handleAddToWaitlist = () => {
    // Handle the waitlist logic here
    // For now, just close the modal
    onClose();
    // You might want to send the email to your backend or email service
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Join Our Waitlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={3}>
            We are accepting emails for our waitlist. Enter your email below,
            and we will notify you.
          </Text>
          <Input
            placeholder="Email"
            mb={3}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button colorScheme="blue" w="full" onClick={handleAddToWaitlist}>
            Add Me to Waitlist
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
