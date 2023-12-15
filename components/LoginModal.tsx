import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";

const LoginModal = ({
  isOpen,
  onClose,
  onSignupClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSignupClick: () => void;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="Email" mb={3} />
          <Input placeholder="Password" type="password" mb={3} />
          <Button colorScheme="blue" w="full">
            Log In
          </Button>
          <Button w="full" mt={3} onClick={onSignupClick}>
            Sign Up
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
